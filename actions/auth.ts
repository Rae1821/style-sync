"use server";
import { db } from "@/db";
import { OAuth2Client } from "google-auth-library";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import path from "path";
import fs from "fs";
import os from "os";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Create a utility for Google OAuth
export async function getGoogleClient() {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    // Use the full callback URL
    process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/callback"
  );
}

export async function generateAuthUrl() {
  const client = await getGoogleClient();
  return client.generateAuthUrl({
    access_type: "offline", // Enables refresh tokens
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent", // Ensures we get a refresh token
  });
}

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

export const geminiAiAction = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: "Why is the sky blue?",
    });

    console.log(response.text);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

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
  fileUrl: string
): Promise<{ text: string }> => {
  const localFilePath = await downloadFile(fileUrl);

  const myFile: UploadedFile = await ai.files.upload({
    file: localFilePath,
    config: { mimeType: "image/jpeg" },
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: createUserContent([
      createPartFromUri(myFile.uri || "", myFile.mimeType || ""),
      "Tell me what this item of clothing would pair well with to make a complete outfit. Every outfit should include a main article of clothing (dress or skirt + top or shirt + pants, or shirt + shorts), shoes, accessories, and a completer piece (sweater, vest, jacket, blazer, etc). Give me examples for multiple occasions. For example: Casual, Weekend, Date night, Vacation, Workwear, etc. Be sure to include the occasion in your response and make sure the response. ------  Here are a couple of examples: ------ 1. User: uploads an image of a white t-shirt. Response: This item works well with - Casual: denim shorts of all shades, colorful sneakers, layered necklaces, and a cardigan in a color that compliments color of sneakers. Vacation: Wide leg navy blue trousers, chunky tan wedge sandals, long boho necklaces, and a cream or tan sweater for cooler nights------ 2. User: uploads an image of a black dress. Response: This {type of item} works well with - Date night: black heels, a red clutch, and a red lipstick. Weekend: white sneakers, a denim jacket, and a crossbody bag. Workwear: a blazer in a color that compliments the dress, black pumps, and a structured handbag.",
    ]),
  });
  console.log(response.text);

  await fs.promises.unlink(localFilePath); // Clean up the temporary file

  // console.log(response.text || undefined);
  return { text: response.text || "" };
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
