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
    <div className="container min-h-screen px-4 mt-12 mx-auto">
      <h1 className="text-center mt-12 mb-8 text-xl tracking-tight font-semibold  md:text-2xl">
        Welcome to your <br />
        <span className="bg-gradient-to-r from-red-300 via-red-300 to-red-500 bg-clip-text text-transparent text-4xl font-bold">
          AI powered <br />
        </span>
        personalized style session
      </h1>
      <p className="text-sm px-4 mx-auto max-w-2xl text-center text-gray-500">
        Upload a picture of a piece of clothing and get outfit recommendations
        for multiple occasions personalized for your{" "}
        <span className="font-semibold text-red-300 text-lg underline underline-offset-4 decoration-wavy">
          {userProfile?.bodyShape}{" "}
        </span>
        body shape and your
        <span className="font-semibold text-red-300 text-lg underline underline-offset-4 decoration-wavy">
          {" "}
          {userProfile?.fashionStyle}{" "}
        </span>{" "}
        fashion style!
      </p>
      <div className="mt-12">
        <StyleSesh userProfile={userProfile} />
      </div>
    </div>
  );
};

export default StyleSeshPage;
