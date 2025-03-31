"use client";

import React from "react";
import { Button } from "./ui/button";

type ButtonProps = {
  title: string;
  // onClick: () => void;
  // href: string;
};

const CoolButton = ({ title }: ButtonProps) => {
  return (
    <>
      <Button className="group relative px-6 py-4 font-semibold text-black bg-transparent">
        <span className="absolute inset-0 size-full -translate-x-2 -translate-y-2 bg-red-300 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 size-full border-4 border-black"></span>
        <span className="relative">{title}</span>
      </Button>
      {/* <Link href="#_" className="group relative inline-block">
        <span className="relative z-10 block overflow-hidden rounded-lg border-2 border-red-300 px-5 py-3 font-medium leading-tight text-red-300 transition-colors duration-300 ease-out group-hover:text-white">
          <span className="absolute inset-0 size-full rounded-lg bg-gray-50 px-5 py-3"></span>
          <span className="ease absolute left-0 -ml-2 size-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-red-300 transition-all duration-300 group-hover:-rotate-180"></span>
          <span className="relative">{title}</span>
        </span>
        <span
          className="absolute bottom-0 right-0 -mb-1 -mr-1 h-12 w-full rounded-lg bg-red-300 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
          data-rounded="rounded-lg"
        ></span>
      </Link> */}
    </>
  );
};

export default CoolButton;
