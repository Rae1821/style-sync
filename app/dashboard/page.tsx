import { findUniqueProducts } from "@/actions/auth";
import Dashboard from "@/components/Dashboard";
import FavoriteProducts from "@/components/FavoriteProducts";
import { db } from "@/db";
import { cookies } from "next/headers";
import React from "react";

const MyDashboard = async () => {
  const userCookies = await cookies();
  const user = userCookies.get("user");
  const userData = user ? JSON.parse(user.value) : null;
  const userEmail = userData?.email;

  if (!userEmail) {
    throw new Error("User not found");
  }
  // Fetch user data from the database
  const userProfile = await db.user.findUnique({
    where: {
      email: userEmail,
    },
    include: {
      products: true,
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

  return (
    <div className="magicpattern min-h-screen py-4">
      <div className="container mx-auto">
        <div className="flex flex-col p-8 mb-4">
          {/* <h2 className="text-2xl font-semibold">
            {" "}
            Hello, {userProfile?.name}
          </h2> */}
          <h2 className="text-2xl font-semibold">Dashboard of Favorites</h2>
          <p className="text-sm text-gray-600">
            All your favorites, stored in one place for easy access.
          </p>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full ">
            {userProfile && <Dashboard userProfile={userProfile} />}
          </div>
          <div className="mt-8 w-full px-4">
            <FavoriteProducts favProducts={favProducts} />
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
