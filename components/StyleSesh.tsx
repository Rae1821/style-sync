"use client";

import { geminiImageUpload } from "@/actions/auth";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";

const StyleSesh = () => {
  const [geminiResponse, setGeminiResponse] = useState({});

  const handleUploadComplete = async (res: { ufsUrl: string }[]) => {
    try {
      const result = await geminiImageUpload(res[0]?.ufsUrl);
      setGeminiResponse(result);

      console.log("Gemini AI action triggered");
      console.log("Response:", result);
      //   return responseText;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const formatResponse = () => {
    const responseText = JSON.stringify(geminiResponse);
    const formattedText = responseText.replace(/\\n/g, "\n");
    return formattedText;
  };

  return (
    <div>
      <div>
        <UploadButton
          className="ut-button:bg-red-300 ut-label:text-black ut-button:ut-readying:bg-red-300/50 ut-button:ut-uploading:bg-red-300/70"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            handleUploadComplete(res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      {geminiResponse && (
        <div>
          <h2>Gemini AI Response</h2>
          <p>{formatResponse}</p>
        </div>
      )}
    </div>
  );
};

export default StyleSesh;
