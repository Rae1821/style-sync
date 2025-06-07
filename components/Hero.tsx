"use client";

import React from "react";
import AnimatedTextUnderlign from "./AnimatedTextUnderlign";
// import CoolButton from "./CoolButton";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
// import Image from "next/image";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="bg-[url(/images/hero.png)] md:bg-[url(/images/hero.jpg)] bg-fixed bg-center bg-no-repeat bg-contain md:bg-cover mx-auto flex w-full pt-24 md:items-center h-svh md:h-[800px]">
      <div className="block w-[300px] py-2 pl-8 md:ml-32 md:w-[500px]">
        <AnimatedTextUnderlign />
        <p className="mb-12 mt-6 hidden md:flex md:w-[350px]">
          Take our quiz to find out your unique fashion style!
        </p>
        <div className="mt-12">
          {/* <CoolButton title="Get started" href="/login" /> */}
          <Button
            className="group relative bg-transparent px-6 py-4 font-semibold text-black"
            onClick={() => router.push("/login")}
          >
            <span className="absolute inset-0 size-full -translate-x-2 -translate-y-2 bg-red-300 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 size-full border-4 border-black"></span>
            <span className="relative">Get started</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
