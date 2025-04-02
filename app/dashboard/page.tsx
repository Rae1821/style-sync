import { findUniqueProducts } from "@/actions/auth";
import Dashboard from "@/components/Dashboard";
import FavoriteProducts from "@/components/FavoriteProducts";
import { db } from "@/db";
import { cookies } from "next/headers";
import React from "react";

interface ProductDetails {
  id?: string;
  userEmail: string;
  product_title?: string | null;
  product_price?: string | null;
  product_original_price?: string | null;
  product_star_rating?: string | null;
  product_num_ratings?: string | null;
  product_url?: string | null;
  product_photo?: string | null;
  asin?: string | null;
}

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

  const fetchUserProducts = await findUniqueProducts();

  return (
    <div className="magicpattern min-h-screen">
      <div className="container">
        <div className="flex flex-col p-8">
          <h2 className="text-2xl font-semibold">
            {" "}
            Hello, {userProfile?.name}
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center md:flex-row">
          {userProfile && <Dashboard userProfile={userProfile} />}
        </div>
        <div className="mt-8">
          <FavoriteProducts
            userProducts={fetchUserProducts.map((product) => ({
              id: product.id,
              userId: product.userId,
              userEmail: product.userEmail,
              title: product.product_title,
              price: product.product_price,
              originalPrice: product.product_original_price,
              starRating: product.product_star_rating,
              numRatings: product.product_num_ratings,
              url: product.product_url,
              photo: product.product_photo,
              asin: product.asin,
            }))}
          />
        </div>
      </div>
      {/* <div>
      <HiChatBubbleBottomCenterText />
    </div> */}
    </div>
  );
};

export default MyDashboard;
