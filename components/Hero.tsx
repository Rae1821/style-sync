"use client";

import React from "react";
import AnimatedTextUnderlign from "./AnimatedTextUnderlign";
import CoolButton from "./CoolButton";

const Hero = () => {
  return (
    <section className="heroImage mx-auto flex h-[800px] w-full pt-24 md:items-center">
      <div className="block w-[300px] py-2 pl-8 md:ml-32 md:w-[500px] ">
        <AnimatedTextUnderlign />
        <p className="mb-12 mt-6 hidden md:flex md:w-[350px]">
          Take our quiz to find out your unique fashion style!
        </p>
        <div className="mt-12">
          <CoolButton title="start quiz" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
