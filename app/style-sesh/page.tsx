import StyleSesh from "@/components/StyleSesh";
import React from "react";

const StyleSeshPage = () => {
  return (
    <div className="container min-h-screen px-4 mt-12">
      <h1 className="text-center">
        Welcome to your personalized AI powered style session
      </h1>
      <div>
        <StyleSesh />
      </div>
    </div>
  );
};

export default StyleSeshPage;
