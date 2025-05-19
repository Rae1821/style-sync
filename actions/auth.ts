"use server";
import db from "@/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
  Modality,
} from "@google/genai";
import path from "path";
import fs from "fs";
import os from "os";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// for debugging purposes
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface UpdateUserInput {
  bodyShape?: string;
  fashionStyle?: string;
}

// Update user
export const updateUser = async (input: UpdateUserInput) => {
  try {
    if (!input || (!input.bodyShape && !input.fashionStyle)) {
      throw new Error("No input provided");
    }
    const updateData: UpdateUserInput = {};
    if (input.bodyShape) {
      updateData.bodyShape = input.bodyShape;
    }
    if (input.fashionStyle) {
      updateData.fashionStyle = input.fashionStyle;
    }
    const userCookie = await cookies();
    const currentUser = userCookie.get("user");
    if (!currentUser) {
      throw new Error("User not found");
    }
    const userData = JSON.parse(currentUser.value);
    const email = userData.email;
    const data = {
      ...updateData,
      updatedAt: new Date(),
    };
    // Update the user in the database
    const updateProfile = await db.user.update({
      where: { email },
      data,
    });
    return updateProfile;
  } catch (error) {
    console.log("Error updating profile", error);
    throw error;
  }
};

// Fetch products from the Amazon API
export async function fetchClothing({ searchItem }: { searchItem: string }) {
  const headers = {
    "X-RapidAPI-Key": "85109d553dmshaef4cc1a6980b3dp1d833fjsne5ad9b4d1cfa",
    "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
  };

  try {
    const response = await fetch(
      `https://real-time-amazon-data.p.rapidapi.com/search?query=${searchItem}&limit=5&page=1`,
      {
        headers,
      }
    );
    // parse the response as json
    const result = await response.json();

    return result.data.products;
  } catch (error) {
    console.log(error);
  }
}

// Favorite Profucts
export const findUniqueProducts = async () => {
  try {
    const userCookie = await cookies();
    const currentUser = userCookie.get("user");
    if (!currentUser) {
      throw new Error("User not found");
    }
    const userData = JSON.parse(currentUser.value);
    const email = userData.email;

    // Find the user by email
    const user = await db.user.findUnique({
      where: { email },
      include: { products: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.products;
  } catch (error) {
    console.log("Error finding unique products", error);
    throw error;
  }
};

interface AddProductInput {
  id?: string;
  product_title?: string;
  product_price?: string;
  product_original_price?: string;
  product_star_rating?: string;
  product_num_ratings?: number;
  product_url?: string;
  product_photo?: string;
  asin?: string;
}

export const addFavoriteProduct = async (product: AddProductInput) => {
  try {
    const userCookie = await cookies();
    const currentUser = userCookie.get("user");
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const userData = JSON.parse(currentUser.value);
    const email = userData.email;

    const addNewProduct = await db.product.create({
      data: {
        user: { connect: { email: email } },
        product_title: product.product_title,
        product_price: product.product_price,
        product_original_price: product.product_original_price,
        product_star_rating: product.product_star_rating,
        product_num_ratings: product.product_num_ratings,
        product_url: product.product_url,
        product_photo: product.product_photo,
        asin: product.asin,
      },
    });

    revalidatePath("/dashboard");
    console.log(addNewProduct, "Product added to favorites");
    return addNewProduct;
  } catch (error) {
    console.log("Error adding product to favorites", error);
    throw error;
  }
};

// Delete Favorite Products
interface DeleteFavoriteProductInput {
  id?: string;
  product_title?: string | null;
  product_price?: string | null;
  product_original_price?: string | null;
  product_star_rating?: string | null;
  product_num_ratings?: number | null;
  product_url?: string | null;
  product_photo?: string | null;
  asin?: string | null;
}

export const deleteFavoriteProduct = async (
  product: DeleteFavoriteProductInput
) => {
  try {
    const userCookie = await cookies();
    const currentUser = userCookie.get("user");
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const deleteFavoriteProduct = await db.product.delete({
      where: {
        id: product.id,
      },
    });
    revalidatePath("/dashboard");
    return deleteFavoriteProduct;
  } catch (error) {
    console.log("Error deleting product from favorites", error);
    throw error;
  }
};

// Gemini AI
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// export const geminiAiAction = async () => {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash-001",
//       contents: "Why is the sky blue?",
//     });

//     console.log(response.text);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// Gemini Image Upload

interface UploadedFile {
  uri?: string;
  mimeType?: string;
}

const downloadFile = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const tempFilePath = path.join(os.tmpdir(), path.basename(url));
  await fs.promises.writeFile(tempFilePath, buffer);
  return tempFilePath;
};

export const geminiImageUpload = async (
  fileUrl: string,
  bodyShape: string,
  fashionStyle: string,
  outfitOccasion: string
): Promise<{
  outfit: {
    outfitOccasion: string;
    mainArticle: string;
    shoes: string;
    accessories: string;
    completerPiece: string;
  };
}> => {
  const localFilePath = await downloadFile(fileUrl);

  const myFile: UploadedFile = await ai.files.upload({
    file: localFilePath,
    config: { mimeType: "image/jpeg" },
  });

  const prompt = `Generate outfit pairings for ${outfitOccasion} using the clothing item in the image, taking into account the user's body shape: "${bodyShape}" (e.g., pear, apple, hourglass, rectangle, inverted triangle) and their fashion style: "${fashionStyle}" (e.g., classic, bohemian, chic, edgy, sporty). Adhere strictly to the following JSON schema and providing ONLY the JSON output. Do not include any introductory or explanatory text. 

  Conider the follow general guidelines when making suggestions:

  For a "pear" body shape, focus on drawing attention upwards with details on the shoulders and neckline, and choose bottoms that create a balanced silhouette.
  For an "apple" body shape, create definition at the waist and choose styles that flow over the midsection.
  For an "hourglass" body shape, highlight the waist and maintain balanced proportions.
  For a "rectangle" body shape, create the illusion of curves and add definition at the waist and shoulders.
  For a "inverted triangle" body shape, balance the silhouette by adding volume to the lower body and keeping the upper body streamlined.

  For a "classic" fashion style, suggest timeless and well-fitting pieces in neutral colors.
  For a "bohemian" fashion style, suggest flowy fabrics, natural textures, and unique accessories.
  For a "chic" fashion style, suggest clean lines, simple silhouettes, and a neutral color palette.
  For an "edgy" fashion style, suggest darker colors, leather, and statement accessories.
  For a "sporty" fashion style, suggest comfortable and functional pieces with a casual vibe.

  The 'mainArticle' in each outfit should either be the uploaded item itself (if it's a complete garment like a dress) or include the uploaded item paired with other suitable pieces (if it's a top, bottom, etc ).

  For each occasion, suggest a complete outfit including:
  - mainArticle: A description of the main clothing item(s) that flatters a "${bodyShape}" body shape and aligns with the "${fashionStyle}" fashion style.
  - shoes: Appropriate footwear for the occasion, considering the "${fashionStyle}" and occasion.
  - accessories: Complementary accessories suitable for the "${fashionStyle}" and occasion.
  - completerPiece: An optional layering piece that works with the "${fashionStyle}" and occasion.

  Return an outfit object following this schema:
  
  Outfit = {'outfitOccasion': 'Casual', 'mainArticle': 'denim shorts paired with a [uploaded item]', 'shoes': 'colorful sneakers', 'accessories': 'layered necklaces', 'completerPiece': 'cardigan in a color that compliments color of sneakers'}

 Example of expected JSON output:
 
 {
    "outfitOccasion": ${outfitOccasion},
    "mainArticle": "high-waisted denim shorts paired with a [uploaded item] (flattering for ${bodyShape}",
    "shoes": "fashionable sneakers in a ${fashionStyle} aesthetic",
    "accessories": "minimalist jewelry suitable for a ${fashionStyle} casual look",
    "completerPiece": "lightweight cardigan"
  }`;

  const response = await ai.models.generateContent({
    // model: "gemini-2.0-flash",
    model: "gemini-1.5-flash",
    contents: createUserContent([
      createPartFromUri(myFile.uri || "", myFile.mimeType || ""),
      prompt,
    ]),
  });
  console.log(response.text);

  await fs.promises.unlink(localFilePath); // Clean up the temporary file

  // console.log(response.text || undefined);
  const parsed = parseGeminiResponse(response.text);
  if (!parsed || (Array.isArray(parsed) && parsed.length === 0)) {
    throw new Error("Failed to parse Gemini response or response is empty");
  }
  // If parsed is an array, take the first element; otherwise, use parsed directly
  const outfit: Outfit = Array.isArray(parsed) ? parsed[0] : parsed;
  return { outfit };
};

// Helper function to parse the Gemini response
interface Outfit {
  outfitOccasion: string;
  mainArticle: string;
  shoes: string;
  accessories: string;
  completerPiece: string;
}

function parseGeminiResponse(
  responseText: string | undefined
): Outfit[] | null {
  if (!responseText) {
    return null;
  }
  try {
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Failed to parse JSON from response:", error);
    return null;
  }
}

// GEMINI API IMAGE GENERATION

interface OutfitResult {
  outfitOccasion: string;
  mainArticle: string;
  shoes: string;
  accessories: string;
  completerPiece: string;
}

export const generateOutfitImage = async (
  outfit: OutfitResult
): Promise<string> => {
  const prompt = `Generate an image of a ${outfit.outfitOccasion} outfit with one of each of the following items: ${outfit.mainArticle}, ${outfit.shoes}, ${outfit.accessories}, ${outfit.completerPiece}. The image should be in a realistic style, showcasing the outfit in a flat lay setting as if the picture is taken from above. The background should be simple and not distract from the outfit.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: [createUserContent(prompt)], // wrap the single prompt in an array
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  console.log(
    "Response: ",
    response?.candidates?.map((candidate) => candidate?.content?.parts)
  );

  for (const part of response?.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const imageData = part.inlineData.data;
      if (!imageData) {
        throw new Error("Image data is undefined");
      }
      // Optionally save the image to disk
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image.png", buffer);
      console.log("Image saved as gemini-native-image.png");
      return imageData;
    }
    if (part.text) {
      console.log(part.text);
    }
  }
  // If no image data found, return empty string
  return "";
};

// UPLOADTHING MOODBOARD IMAGES

interface AddUploadedImagesInput {
  id?: string;
  email: string;
  image_url?: string;
  image_name?: string;
}

// Add uploaded images to moodboard
export const addUploadedImages = async (image: AddUploadedImagesInput) => {
  try {
    const addImage = await db.image.create({
      data: {
        user: { connect: { email: image.email } },
        image_url: image.image_url,
        image_name: image.image_name,
      },
    });

    revalidatePath("/moodboard");
    return addImage;
  } catch (error: unknown) {
    console.log("Error adding image:", error);
    throw error;
  }
};

// Find user's uploaded images
export const findUniqueImages = async () => {
  try {
    const userCookie = await cookies();
    const currentUser = userCookie.get("user");

    if (!currentUser) {
      throw new Error("User not authenticated");
    }
    const userData = JSON.parse(currentUser.value);

    const findImages = await db.image.findMany({
      where: {
        user: {
          email: userData.email,
        },
      },
      select: {
        id: true,
        image_url: true,
        image_name: true,
      },
    });

    return JSON.parse(JSON.stringify(findImages));
  } catch (error) {
    console.log("Error finding images:", error);
    throw error;
  }
};

interface DeleteUploadedImageInput {
  id: string;
  image_url: string;
  image_name: string;
}
// Delete an uploaded image from moodboard
export const deleteUploadedImage = async (image: DeleteUploadedImageInput) => {
  try {
    const userCookie = await cookies();
    const currentUser = userCookie.get("user");

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    console.log(image.id);
    const deleteImage = await db.image.delete({
      where: {
        id: image.id,
      },
    });
    revalidatePath("/moodboard");
    return deleteImage;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error deleting image:", error.message);
    } else {
      console.log("Error deleting image:", error);
    }
    throw error;
  }
};

// Favorite Profucts
export const findUniqueOutfits = async () => {
  try {
    const userCookie = await cookies();
    const currentUser = userCookie.get("user");
    if (!currentUser) {
      throw new Error("User not found");
    }
    const userData = JSON.parse(currentUser.value);
    const email = userData.email;

    // Find the user by email
    const user = await db.user.findUnique({
      where: { email },
      include: { outfits: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.outfits;
  } catch (error) {
    console.log("Error finding unique outfits", error);
    throw error;
  }
};

interface AddOutfitInput {
  outfitOccasion: string;
  mainArticle: string;
  shoes: string;
  accessories: string;
  completerPiece: string;
}

// Adding outfit ideas to database
export const addFavoriteOutfit = async (
  outfit: AddOutfitInput,
  imageData: string
) => {
  try {
    const userCookie = await cookies();
    const currentUser = userCookie.get("user");
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const userData = JSON.parse(currentUser.value);
    const email = userData.email;

    const addNewOutfit = await db.outfit.create({
      data: {
        user: { connect: { email: email } },
        imageData: imageData,
        outfit_occasion: outfit.outfitOccasion,
        outfit_main_article: outfit.mainArticle,
        outfit_shoes: outfit.shoes,
        outfit_accessories: outfit.accessories,
        outfit_completer_piece: outfit.completerPiece,
      },
    });

    revalidatePath("/dashboard");
    console.log(addNewOutfit, "Outfit added to favorites");
    return addNewOutfit;
  } catch (error) {
    console.log("Error adding outfit to favorites", error);
    throw error;
  }
};
