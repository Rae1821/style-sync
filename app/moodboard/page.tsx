// import { findUniqueImages, findUniqueProducts } from "@/actions/auth";
import MoodBoard from "@/components/MoodBoard";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const MoodboardPage = async () => {
  // const fetchUserProducts = await findUniqueProducts();
  // const fetchUserImages = await findUniqueImages();

  const userCookies = await cookies();
  const user = userCookies.get("user");

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

  return (
    <div className="container min-h-screen">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">My Moodboard</h1>
        <p className="mb-8 text-sm text-muted-foreground tracking-tight">
          Here you can create your own outfit ideas by uploading photos of
          existing clothing items and/or saving products that you love. This is
          a great way to visually see what products might work with items you
          already have.
        </p>
      </div>
      <div>
        <MoodBoard
        // userProducts={fetchUserProducts}
        // userImages={fetchUserImages}
        />
      </div>
    </div>
  );
};

export default MoodboardPage;
