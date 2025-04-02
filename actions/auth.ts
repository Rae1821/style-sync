"use server";
import { db } from "@/db";
import { OAuth2Client } from "google-auth-library";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
