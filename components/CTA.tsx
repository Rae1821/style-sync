"use client";

import React from "react";
// import CoolButton from "./CoolButton";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center rounded-lg bg-muted p-8 text-center md:rounded-xl lg:p-16">
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            Ready To Get Started?
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            Join our community of fashion enthusiasts and discover the perfect
            outfits for your body shape and style. Sign up now to unlock
            personalized recommendations and exclusive content!
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            {/* <CoolButton title="Yes I'm ready!" /> */}
            <Button
              className="group relative bg-transparent px-6 py-4 font-semibold text-black"
              onClick={() => router.push("/login")}
            >
              <span className="absolute inset-0 size-full -translate-x-2 -translate-y-2 bg-red-300 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 size-full border-4 border-black"></span>
              <span className="relative">Yes I&apos;m Ready!</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
