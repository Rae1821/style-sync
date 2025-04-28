import StyleSesh from "@/components/StyleSesh";
import { db } from "@/db";
import { cookies } from "next/headers";
import React from "react";

const StyleSeshPage = async () => {
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

  return (
    <div className="container min-h-screen px-4 mt-12">
      <h1 className="text-center">
        Welcome to your personalized AI powered style session
      </h1>
      <div className="mt-12">
        <StyleSesh userProfile={userProfile} />
      </div>
    </div>
  );
};

export default StyleSeshPage;
