import { findUniqueOutfits, findUniqueProducts } from "@/actions/auth";
import { auth } from "@/auth";
import Dashboard from "@/components/Dashboard";
import FavoriteProducts from "@/components/FavoriteProducts";
import db from "@/db";
import Link from "next/link";
import React from "react";
import FavoriteOutfits from "@/components/FavoriteOutfits";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";

const MyDashboard = async () => {
  const session = await auth();
  // console.log("User:", user);

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">
          Please <Link href="/login">login</Link> to access your dashboard
        </h1>
        <p className="text-gray-600">
          You need to be logged in to view this page.
        </p>
      </div>
    );
  }

  if (!session?.user?.email) {
    throw new Error("User not found");
  }
  // Fetch user data from the database
  const userProfile = await db.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    include: {
      products: true,
      outfits: true,
    },
  });
  if (!userProfile) {
    throw new Error("User not found");
  }

  const userProducts = await findUniqueProducts();
  console.log(userProducts);

  const favProducts = userProducts.map((product) => {
    return {
      id: product.id,
      userEmail: product.userEmail || "",
      product_title: product.product_title || "",
      product_price: product.product_price || "",
      product_original_price: product.product_original_price || "",
      product_star_rating: product.product_star_rating || "",
      product_num_ratings: product.product_num_ratings || 0,
      product_url: product.product_url || "",
      product_photo: product.product_photo || "",
      asin: product.asin,
    };
  });

  const userOutfits = await findUniqueOutfits();

  const favOutfits = userOutfits.map((outfit) => {
    return {
      id: outfit.id,
      userEmail: outfit.userEmail || "",
      outfit_occasion: outfit.outfit_occasion || "",
      outfit_main_article: outfit.outfit_main_article || "",
      outfit_shoes: outfit.outfit_shoes || "",
      outfit_accessories: outfit.outfit_accessories || "",
      outfit_completer_piece: outfit.outfit_completer_piece || "",
      imageData: outfit.imageData || "",
      favorite: outfit.favorite || false,
    };
  });

  return (
    <div className="magicpattern min-h-screen py-4">
      <div className="flex flex-col p-8 mb-4">
        <div className="flex w-1/2 mb-4">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="User Profile"
              width={50}
              height={50}
              className="rounded-full mb-4 mr-2"
            />
          ) : (
            <BsPersonCircle className="w-[50px] h-[50px] rounded-full mb-4 mx-auto" />
          )}
          <div>
            <p className="font-semibold">{session?.user?.name}</p>
            <p className="text-xs text-gray-600">Fashion Enthusiast</p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-300 from-10% via-red-500 via-30% to-red-700 to-90% bg-clip-text text-transparent tracking-tighter">
          Dashboard of Favorites
        </h2>
        <p className="text-sm text-gray-600">
          All your favorites, stored in one place for easy access.
        </p>
      </div>
      <div className="container mx-auto">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full ">
            {userProfile && <Dashboard userProfile={userProfile} />}
          </div>
          <div className="mt-8 w-full px-4">
            <FavoriteProducts favProducts={favProducts} />
          </div>
          <div className="mt-8 w-full px-4">
            <FavoriteOutfits favOutfits={favOutfits} />
          </div>
        </div>
      </div>
      {/* <div>
      <HiChatBubbleBottomCenterText />
    </div> */}
    </div>
  );
};

export default MyDashboard;
