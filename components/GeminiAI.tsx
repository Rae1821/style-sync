"use client";

import { geminiAiAction } from "@/actions/auth";

const GeminiAI = () => {
  const handleClick = async () => {
    await geminiAiAction();
    console.log("Gemini AI action triggered");
  };

  return (
    <div>
      <button onClick={handleClick}>Gemini AI</button>
    </div>
  );
};

export default GeminiAI;
