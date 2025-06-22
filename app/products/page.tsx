import { auth } from "@/auth";
import ProductsList from "@/components/ProductsList";
import SearchInput from "@/components/SearchInput";
import SearchSuggestions from "@/components/SearchSuggestions";
import { Skeleton } from "@/components/ui/skeleton";
import db from "@/db";
import Link from "next/link";
import React, { Suspense } from "react";

const ProductsPage = async (props: {
  searchParams?: Promise<{ query?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const session = await auth();
  const user = session?.user;

  if (!user) {
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

  // Fetch user data from the database
  const userProfile = await db.user.findUnique({
    where: {
      email: user?.email ?? undefined,
    },
  });
  if (!userProfile) {
    throw new Error("User not found");
  }

  const userProfileData = {
    bodyShape: userProfile.bodyShape || "",
    fashionStyle: userProfile.fashionStyle || "",
  };

  return (
    <div className="container mx-auto max-w-[1100px] px-8 md:px-12 mt-4">
      <div className="">
        <div className="text-center">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-red-300/30 via-red-300/80 to-red-500 bg-clip-text text-transparent ">
            Product Search
          </h2>
          <p className="mt-2 text-sm font-normal tracking-tight text-muted-foreground">
            Use the search box below to find items that are perfect for your
            body shape and fashion style.
          </p>
          <p className="mt-2 text-sm font-normal tracking-tight text-muted-foreground">
            Click the plus icon at the top of each products to save it to the
            favorites section on your dashboard.
          </p>
        </div>
        <div className="mt-8 mx-auto max-w-[1200px]">
          <SearchSuggestions userProfile={userProfileData} />
          <div className="mt-12">
            <SearchInput />
          </div>
        </div>
        <div className="mt-4">
          <Suspense key={query} fallback={<Skeleton />}>
            <ProductsList query={query} />
          </Suspense>
        </div>
      </div>
      {/* <div className="mt-24 max-w-[1300px]">
        <ProductsList searchItem={searchItem || ""} />
      </div> */}
    </div>
  );
};

export default ProductsPage;
