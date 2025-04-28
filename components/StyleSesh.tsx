"use client";

import { geminiImageUpload } from "@/actions/auth";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";

interface ProfileDetails {
  id: string | null;
  email: string | null;
  name: string | null;
  bodyShape: string | null;
  fashionStyle: string | null;
}

const StyleSesh = ({ userProfile }: { userProfile: ProfileDetails }) => {
  interface GeminiResponse {
    outfits?:
      | {
          outfitOccasion: string;
          mainArticle: string;
          shoes: string;
          accessories: string;
          completerPiece: string;
        }[]
      | null;
  }

  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse>({});
  const bodyShape = userProfile?.bodyShape;
  const fashionStyle = userProfile?.fashionStyle;

  const handleUploadComplete = async (res: { ufsUrl: string }[]) => {
    try {
      const result = await geminiImageUpload(
        res[0]?.ufsUrl,
        bodyShape || "",
        fashionStyle || ""
      );
      setGeminiResponse(result);

      console.log("Gemini AI action triggered");
      console.log("Response:", result);
      //   return responseText;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  console.log(geminiResponse.outfits);
  //   const formatResponse = () => {
  //     const responseText = JSON.stringify(geminiResponse);
  //     const formattedText = responseText.replace(/\\n/g, "\n");
  //     return formattedText;
  //   };

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
        </div>
      )}
    </div>
  );
};

export default StyleSesh;
