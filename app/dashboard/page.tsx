import { auth } from "@/auth";
import Dashboard from "@/components/Dashboard";
import db from "@/db";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";

const MyDashboard = async () => {
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

  if (!session?.user?.email) {
    throw new Error("User not found");
  }

  const userProfile = await db.user.findUnique({
    where: {
      email: session?.user.email ?? undefined,
    },
  });

  if (!userProfile) {
    throw new Error("User not found");
  }

  return (
    <div className="min-h-screen py-4">
      <div className="flex flex-col py-8 px-10 mb-4 max-w-[1300px] mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tighter">Dashboard</h2>
          <p className="text-sm tracking-tight">
            All your favorites, stored in one place for easy access.
          </p>
        </div>
        <div className="flex w-3/4 mb-4">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="User Profile"
              width={38}
              height={38}
              className="rounded-full mb-4 mr-2"
            />
          ) : (
            <BsPersonCircle className="w-[38px] h-[38px] rounded-full mb-4 mx-auto" />
          )}
          <div>
            <p className="font-semibold">{session?.user?.name}</p>
            <p className="text-xs text-muted-foreground">Fashion Enthusiast</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[1300px] mx-auto">
          <div className="w-full ">
            {userProfile && <Dashboard userProfile={userProfile} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
