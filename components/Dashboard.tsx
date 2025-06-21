"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiMiniFire, HiMiniBolt } from "react-icons/hi2";
import { IoWomanSharp } from "react-icons/io5";
import { FaShirt } from "react-icons/fa6";
import { BsArrowDown } from "react-icons/bs";

import {
  pearBodyCharacteristic,
  appleBodyCharacteristic,
  rectangleBodyCharacteristic,
  hourglassBodyCharacteristic,
  invertedTriangleBodyCharacteristic,
  classicStyle,
  bohoStyle,
  chicStyle,
  sportyStyle,
  edgyStyle,
} from "@/constants";
// import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CalculateShape from "./CalculateShape";
import StyleQuiz from "./StyleQuiz";
import { findUniqueProducts, findUniqueOutfits } from "@/actions/auth";
import React, { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import FavoriteOutfits from "./FavoriteOutfits";
import FavoriteProducts from "./FavoriteProducts";

interface ProfileDetails {
  id: string | null;
  email: string | null;
  name: string | null;
  bodyShape: string | null;
  fashionStyle: string | null;
}

interface Product {
  id: string;
  userEmail: string | null;
  product_title: string | null;
  product_price: string | null;
  product_original_price: string | null;
  product_rating: number | null;
  product_num_reviews: number | null;
  product_url: string | null;
  product_photo: string | null;
  asin: string | null;
  store_name: string | null;
}

interface Outfit {
  id: string;
  userEmail: string | null;
  outfit_occasion: string | null;
  outfit_main_article: string | null;
  outfit_shoes: string | null;
  outfit_accessories: string | null;
  outfit_completer_piece: string | null;
  imageData: string | null;
  favorite: boolean | null;
}

const Dashboard = ({ userProfile }: { userProfile: ProfileDetails }) => {
  const [loading, setLoading] = React.useState(true);
  const [favProducts, setFavProducts] = React.useState<Product[]>([]);
  const [favOutfits, setFavOutfits] = React.useState<Outfit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [products, outfits] = await Promise.all([
          findUniqueProducts(),
          findUniqueOutfits(),
        ]);

        const fetchProducts = products.map((product: Product) => ({
          id: product.id,
          userEmail: product.userEmail ?? "",
          product_title: product.product_title ?? "",
          product_price: product.product_price ?? "",
          product_original_price: product.product_original_price ?? "",
          product_rating: product.product_rating ?? 0,
          product_num_reviews: product.product_num_reviews ?? 0,
          product_url: product.product_url ?? "",
          product_photo: product.product_photo ?? "",
          asin: product.asin,
          store_name: product.store_name ?? "",
        }));

        const fetchOutfits = outfits.map((outfit: Outfit) => ({
          id: outfit.id,
          userEmail: outfit.userEmail,
          outfit_occasion: outfit.outfit_occasion ?? "",
          outfit_main_article: outfit.outfit_main_article ?? "",
          outfit_shoes: outfit.outfit_shoes ?? "",
          outfit_accessories: outfit.outfit_accessories ?? "",
          outfit_completer_piece: outfit.outfit_completer_piece ?? "",
          imageData: outfit.imageData ?? "",
          favorite: outfit.favorite ?? false,
        }));
        setFavProducts(fetchProducts);
        setFavOutfits(fetchOutfits);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userProfile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-8 mx-auto px-4">
        {/* Body Shape Card  */}
        <div className="w-full">
          <Card className="relative w-full h-[275px]">
            <CardHeader>
              <CardDescription>Body Shape</CardDescription>
              <CardTitle className="text-2xl font-semibold text-[#09090B]">
                {userProfile.bodyShape === null ? (
                  <p className="text-sm mt-4 text-gray-800">
                    Hmm...Nothing here yet. Have you calculated your shape?
                    <BsArrowDown className="h-6 w-6 mt-8 animate-bounce" />
                  </p>
                ) : (
                  userProfile?.bodyShape
                )}
              </CardTitle>
              <div className="absolute right-4 top-4 bg-red-300/80 rounded-full p-2">
                <IoWomanSharp className="text-2xl text-gray-800 size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div>
                {userProfile.bodyShape === "Pear" ? (
                  <ul className="grid grid-cols-2 gap-2">
                    {pearBodyCharacteristic.map((item) => (
                      <li
                        key={item}
                        className="flex text-sm gap-1 lg:text-base"
                      >
                        <HiMiniFire className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Apple" ? (
                  <ul className="grid grid-cols-2 gap-2">
                    {appleBodyCharacteristic.map((item) => (
                      <li
                        key={item}
                        className="flex gap-1 text-sm lg:text-base"
                      >
                        <HiMiniFire className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Rectangle" ? (
                  <ul className="grid grid-cols-2 gap-2">
                    {rectangleBodyCharacteristic.map((item) => (
                      <li
                        key={item}
                        className="flex gap-1 text-sm lg:text-base"
                      >
                        {" "}
                        <HiMiniFire className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Hourglass" ? (
                  <ul className="grid grid-cols-2 gap-2">
                    {hourglassBodyCharacteristic.map((item) => (
                      <li
                        key={item}
                        className="flex gap-1 text-sm lg:text-base"
                      >
                        {" "}
                        <HiMiniFire className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Inverted Triangle" ? (
                  <ul className="grid grid-cols-2 gap-2">
                    {invertedTriangleBodyCharacteristic.map((item) => (
                      <li
                        key={item}
                        className="flex gap-1 text-sm lg:text-base"
                      >
                        {" "}
                        <HiMiniFire className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {/* <div className="mt-4">
                <p className="font-medium">Common clothing items include:</p>
                {userProfile.bodyShape === "Pear" ? (
                  <ul>
                    {bestPearProducts.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <IoShirtOutline />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Apple" ? (
                  <ul>
                    {bestAppleProducts.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <IoShirtOutline />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Rectangle" ? (
                  <ul>
                    {bestRectangleProducts.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <IoShirtOutline />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Hourglass" ? (
                  <ul>
                    {bestHourglassProducts.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <IoShirtOutline />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Inverted Triangle" ? (
                  <ul>
                    {bestInvertedTriangleProducts.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <IoShirtOutline />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div> */}
            </CardContent>
            <CardFooter className="absolute bottom-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="group relative bg-transparent px-6 py-4 font-semibold text-black">
                    <span className="absolute inset-0 size-full -translate-x-2 -translate-y-2 bg-red-300 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
                    <span className="absolute inset-0 size-full border-4 border-black"></span>
                    <span className="relative">Calculate Shape</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Body Shape Calculator</DialogTitle>
                    <DialogDescription>
                      Measure around each area using inches
                    </DialogDescription>
                  </DialogHeader>
                  {/* Calculate Shape Component */}
                  <CalculateShape />
                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        {/* Fashion Quiz Card */}
        <div className="w-full">
          <Card className="relative h-[275px] w-full">
            <CardHeader>
              <CardDescription>Fashion Style</CardDescription>
              <CardTitle className="text-2xl font-semibold text-[#09090B]">
                {userProfile.fashionStyle === null ? (
                  <p className="text-sm mt-4 text-gray-800">
                    Hmm...Nothing here yet. Have you taken the style quiz?
                    <BsArrowDown className="h-6 w-6 mt-8 animate-bounce" />
                  </p>
                ) : (
                  userProfile?.fashionStyle
                )}
              </CardTitle>
              <div className="absolute right-4 top-4 bg-red-300/80 rounded-full p-2">
                <FaShirt className="text-2xl text-gray-800 size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div>
                {/* Characteristics for your style include: */}
                {userProfile.fashionStyle === "Classic" ? (
                  <ul className="grid grid-cols-2 gap-2">
                    {classicStyle.map((item) => (
                      <li
                        key={item}
                        className="flex gap-1 items-start text-sm lg:text-base"
                      >
                        <HiMiniBolt className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Boho" ? (
                  <ul>
                    {bohoStyle.map((item) => (
                      <li
                        key={item}
                        className="flex text-sm lg:text-base gap-1"
                      >
                        <HiMiniBolt className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Chic" ? (
                  <ul>
                    {chicStyle.map((item) => (
                      <li
                        key={item}
                        className="flex items-start text-sm lg:text-base gap-1"
                      >
                        <HiMiniBolt className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Sporty" ? (
                  <ul>
                    {sportyStyle.map((item) => (
                      <li
                        key={item}
                        className="flex items-start text-sm lg:text-base gap-1"
                      >
                        <HiMiniBolt className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Edgy" ? (
                  <ul>
                    {edgyStyle.map((item) => (
                      <li
                        key={item}
                        className="flex items-start text-sm lg:text-base gap-1"
                      >
                        <HiMiniBolt className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="absolute bottom-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="group relative bg-transparent px-6 py-4 font-semibold text-black">
                    <span className="absolute inset-0 size-full -translate-x-2 -translate-y-2 bg-red-300 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
                    <span className="absolute inset-0 size-full border-4 border-black"></span>
                    <span className="relative">Take Style Quiz</span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-h-screen overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle>Fashion Style Quiz</DialogTitle>
                    <DialogDescription>
                      Answer the questions below to uncover your fashion style.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Style Quiz Component */}
                  <StyleQuiz />
                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="mt-8 w-full px-4">
        <FavoriteProducts favProducts={favProducts} />
      </div>
      <div className="mt-8 w-full px-4">
        <FavoriteOutfits favOutfits={favOutfits} />
      </div>
    </div>
  );
};

export default Dashboard;
