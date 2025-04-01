import CalculateShape from "@/components/CalculateShape";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const findShapePage = () => {
  return (
    <div className="">
      <div className="mb-12 mt-2">
        <Button variant="link" asChild>
          <Link href="/dashboard" className="flex gap-2">
            <span className="">
              <BsArrowLeft className="size-4" />
            </span>
            <span>Back to profile</span>
          </Link>
        </Button>
      </div>
      <div className="container">
        <div className="mb-12">
          <h2 className="text-xl font-semibold">Find Your Body Shape</h2>
          <p>Answer the questions below to uncover your body shape.</p>
        </div>
        <div>
          <CalculateShape />
        </div>
      </div>
    </div>
  );
};

export default findShapePage;
