import Dashboard from "@/components/Dashboard";
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

  return (
    <div className="container mx-auto mt-12 px-2">
      <Dashboard userProfile={userProfile} />
    </div>
  );
};

export default MyDashboard;
