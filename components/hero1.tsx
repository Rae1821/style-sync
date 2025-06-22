"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import AnimatedTextUnderlign from "./AnimatedTextUnderlign";
// import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero1 = () => {
  const router = useRouter();
  return (
    <section className="px-4 overflow-hidden py-12 md:py-24">
      <div className="container flex flex-col items-center px-8 mx-auto">
        <AnimatedTextUnderlign />
        <p className="mb-8 mt-2 max-w-2xl text-sm lg:text-lg text-center">
          Where technology meets style, AI-powered fashion at your fingertips.
        </p>
        <div className="mt-2 flex w-3/4 flex-col justify-center gap-2 md:w-1/2 lg:w-[200px]">
          {/* <Link
            href="/login"
            className="group relative bg-transparent px-6 py-4 font-semibold text-black hover:cursor-pointer"
          > */}
          <Button
            className="group relative bg-transparent px-6 py-4 font-semibold text-black hover:cursor-pointer"
            onClick={() => router.push("/login")}
          >
            <span className="absolute inset-0 size-full -translate-x-2 -translate-y-2 bg-red-300 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 size-full border-4 border-black"></span>
            <span className="relative">Get started </span>
          </Button>
          {/* </Link> */}
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center lg:mt-12">
        <div className="b relative mx-auto aspect-square w-[95%] max-w-[31.25rem] sm:w-full">
          <div className="absolute inset-0 z-5 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] translate-x-[-75%] translate-y-[10%] scale-[0.85] rotate-[-15deg] justify-center rounded-lg border border-border bg-accent opacity-60 md:w-[21.25rem] md:max-w-[21.25rem]">
            <Image
              src="/images/hero.jpg"
              alt="hero section demo image showing interface components"
              width={400}
              height={400}
              loading="lazy"
              className="w-full h-full rounded-md object-cover"
            />
          </div>
          <div className="absolute inset-0 z-10 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] justify-center rounded-lg border border-border bg-accent md:w-[21.25rem] md:max-w-[21.25rem]">
            <Image
              src="/images/hero.jpg"
              alt="hero section demo image showing interface components"
              width={400}
              height={400}
              loading="lazy"
              className="w-full h-full rounded-md object-cover"
            />
          </div>
          <div className="absolute inset-0 z-0 m-auto flex aspect-29/36 max-w-[16rem] translate-x-[75%] translate-y-[10%] scale-[0.85] rotate-[15deg] justify-center rounded-lg border border-border bg-accent opacity-60 w-[21.25rem] md:max-w-[21.25rem]">
            <Image
              src="/images/hero.jpg"
              alt="hero section demo image showing interface components"
              width={400}
              height={400}
              loading="lazy"
              className="w-full h-full rounded-md object-cover z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
