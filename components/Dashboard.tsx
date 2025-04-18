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

interface ProfileDetails {
  id: string | null;
  email: string | null;
  name: string | null;
  bodyShape: string | null;
  fashionStyle: string | null;
}

const Dashboard = ({ userProfile }: { userProfile: ProfileDetails }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 mx-auto px-4">
        {/* Body Shape Card  */}
        <div className="w-full">
          <Card className="relative w-full h-[275px] md:h-[560px]">
            <CardHeader>
              <CardDescription>Body Shape</CardDescription>
              <CardTitle className="text-2xl font-semibold text-[#09090B]">
                {userProfile?.bodyShape}
              </CardTitle>
              <div className="absolute right-4 top-4 bg-red-300 rounded-full p-2">
                <IoWomanSharp className="text-2xl text-neutral-100" />
              </div>
            </CardHeader>
            <CardContent>
              <div>
                {userProfile.bodyShape === "Pear" ? (
                  <ul className="grid grid-cols-2">
                    {pearBodyCharacteristic.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1 text-sm"
                      >
                        <HiMiniFire className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Apple" ? (
                  <ul className="grid grid-cols-2">
                    {appleBodyCharacteristic.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <HiMiniFire />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Rectangle" ? (
                  <ul className="grid grid-cols-2">
                    {rectangleBodyCharacteristic.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        {" "}
                        <HiMiniFire />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Hourglass" ? (
                  <ul className="grid grid-cols-2">
                    {hourglassBodyCharacteristic.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        {" "}
                        <HiMiniFire />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.bodyShape === "Inverted Triangle" ? (
                  <ul className="grid grid-cols-2">
                    {invertedTriangleBodyCharacteristic.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        {" "}
                        <HiMiniFire />
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
                  {/* <Button variant="outline">Calculate Shape</Button> */}
                  {/* <CoolButton title="Calculate Shape" /> */}
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
          <Card className="relative h-[300px] w-full md:h-[560px]">
            <CardHeader>
              <CardDescription>Fashion Style</CardDescription>
              <CardTitle className="text-2xl font-semibold text-[#09090B]">
                {userProfile.fashionStyle}
              </CardTitle>
              <div className="absolute right-4 top-4 bg-red-300 rounded-full p-2">
                <FaShirt className="text-2xl text-neutral-100" />
              </div>
            </CardHeader>
            <CardContent>
              <div>
                {/* Characteristics for your style include: */}
                {userProfile.fashionStyle === "Classic" ? (
                  <ul className="grid grid-cols-2">
                    {classicStyle.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1 text-xs"
                      >
                        <HiMiniBolt className="text-red-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Boho" ? (
                  <ul>
                    {bohoStyle.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <HiMiniBolt />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Chic" ? (
                  <ul>
                    {chicStyle.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <HiMiniBolt />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Sporty" ? (
                  <ul>
                    {sportyStyle.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <HiMiniBolt />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Edgy" ? (
                  <ul>
                    {edgyStyle.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <HiMiniBolt />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {/* <div className="mt-4">
                <p className="font-medium">Common clothing items include:</p>
                {userProfile.fashionStyle === "Classic" ? (
                  <ul>
                    {classicClothing.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <IoShirtOutline />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Boho" ? (
                  <ul>
                    {bohoClothing.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <IoShirtOutline />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Chic" ? (
                  <ul>
                    {chicClothing.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <IoShirtOutline />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Sporty" ? (
                  <ul>
                    {sportyClothing.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <IoShirtOutline />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : userProfile.fashionStyle === "Edgy" ? (
                  <ul>
                    {edgyClothing.map((item) => (
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
    </div>
  );
};

export default Dashboard;
