import ProductsList from "@/components/ProductsList";
import { styleShapeSearchTerms } from "@/constants";
import { db } from "@/db";
import { cookies } from "next/headers";
import React from "react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { searchItem?: string };
}) => {
  const { searchItem } = await searchParams;

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
  });
  if (!userProfile) {
    throw new Error("User not found");
  }

  const bodyShape = userProfile?.bodyShape;
  const fashionStyle = userProfile?.fashionStyle;

  return (
    <div className="container mx-auto max-w-[1300px] px-10">
      <div className="mt-10 grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2">
        <div className="row-span-2 rounded bg-red-300/80 p-8 shadow">
          <h2 className="text-2xl font-semibold text-[#09090B]">
            Hello, {userProfile?.name}
          </h2>
          <p className="mt-2 text-sm font-normal tracking-tight">
            Use the search box below to find items that are perfect for your
            body shape and fashion style.
          </p>
          <p className="mt-2 text-sm font-normal tracking-tight">
            Click the plus icon at the top of each products to save it to the
            favorites section on your dashboard.
          </p>
        </div>
        <div className="row-span-2 grid grid-cols-1 grid-rows-2 gap-4">
          <div className="h-24 rounded bg-red-300/80 p-6 shadow">
            <p className="text-sm tracking-tight">
              Your fashion style is:{" "}
              <span className="block text-2xl font-semibold text-[#09090B]">
                {fashionStyle}
              </span>
            </p>
          </div>
          <div className="h-24 rounded bg-red-300/80 p-6 shadow">
            <p className="text-sm tracking-tight">
              Your body shape is:{" "}
              <span className="block text-2xl font-semibold text-[#09090B]">
                {bodyShape}
              </span>
            </p>
          </div>
          <div>
            <p>Product Search Ideas</p>
          </div>
        </div>
      </div>

      <ProductsList searchItem={searchItem || ""} />
    </div>
  );
};

export default ProductsPage;
