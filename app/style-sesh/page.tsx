import { auth } from "@/auth";
import StyleSesh from "@/components/StyleSesh";
import db from "@/db";
import Link from "next/link";
import React from "react";

const StyleSeshPage = async () => {
  const session = await auth();

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

  // Fetch user data from the database
  const userProfile = await db.user.findUnique({
    where: {
      email: session?.user.email ?? undefined,
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
        <span className="bg-gradient-to-r from-red-200 from-10% via-red-300 via-30% to-red-500 bg-clip-text text-transparent text-4xl font-bold">
          AI powered <br />
        </span>
        personalized style session
      </h1>
      <p className="text-sm px-4 mx-auto max-w-2xl text-center text-gray-500">
        Have a dress but not sure what to wear with it for work?
        <span className="block mt-1">
          Need a great special occasion outfit to show off those sparkly boots?
        </span>
      </p>

      <p className="text-sm px-4 mx-auto max-w-2xl text-center text-gray-500 mt-2">
        Upload a picture of the item then pick an occasion from the dropdown and
        personalized outfit recommendations tailored to your{" "}
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
