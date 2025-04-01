// import Quiz from "@/components/Quiz";
import StyleQuiz from "@/components/StyleQuiz";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const page = () => {
  return (
    <div className="container">
      <div className="mt-4">
        <Button variant="link" asChild>
          <Link href="/dashboard" className="flex gap-2">
            <span className="">
              <BsArrowLeft className="size-4" />
            </span>
            <span>Back to profile</span>
          </Link>
        </Button>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Fashion Style Quiz</h2>
        <p>
          Answer the questions below to uncover your personal fashion style.
        </p>
      </div>

      <StyleQuiz />
    </div>
  );
};

export default page;
