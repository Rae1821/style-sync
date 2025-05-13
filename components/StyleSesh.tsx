"use client";

import { geminiImageUpload, generateOutfitImage } from "@/actions/auth";
import { UploadButton } from "@/utils/uploadthing";
// import { useState } from "react";
// import { Skeleton } from "./ui/skeleton";

// import OutfitCard from "./OutfitCard";

interface ProfileDetails {
  id: string | null;
  email: string | null;
  name: string | null;
  bodyShape: string | null;
  fashionStyle: string | null;
}

// interface GeminiResponse {
//   outfits?:
//     | {
//         outfitOccasion: string;
//         mainArticle: string;
//         shoes: string;
//         accessories: string;
//         completerPiece: string;
//       }[]
//     | null;
// }

// interface Outfit {
//   outfitOccasion: string;
//   outfitMainArticle: string;
//   outfitShoes: string;
//   outfitAccessories: string;
//   outfitCompleterPiece: string;
// }

const StyleSesh = ({ userProfile }: { userProfile: ProfileDetails }) => {
  // const [geminiResponse, setGeminiResponse] = useState<GeminiResponse>({});
  // const [loading, setLoading] = useState(false);
  // const [addFavorite, setAddFavorite] = useState(false);

  const bodyShape = userProfile?.bodyShape;
  const fashionStyle = userProfile?.fashionStyle;

  const handleUploadComplete = async (res: { ufsUrl: string }[]) => {
    try {
      // setLoading(true);
      const result = await geminiImageUpload(
        res[0]?.ufsUrl,
        bodyShape || "",
        fashionStyle || ""
      );
      // setGeminiResponse(result);
      const outfitResults = result.outfits;

      if (outfitResults) {
        return handleGenerateOutfitImages(outfitResults);
      }

      console.log(result.outfits);
      // setLoading(false);
      console.log("Gemini AI action triggered");
      console.log("Response:", result);
      //   return responseText;
    } catch (error) {
      console.error("Error uploading image:", error);
      // setLoading(false);
    }
  };

  // console.log(geminiResponse.outfits);

  interface OutfitResult {
    outfitOccasion: string;
    mainArticle: string;
    shoes: string;
    accessories: string;
    completerPiece: string;
  }

  const handleGenerateOutfitImages = async (outfitResults: OutfitResult[]) => {
    try {
      const imageResult = await generateOutfitImage(outfitResults);
      console.log(imageResult);
    } catch (error) {
      console.error("Error generating outfit images:", error);
    }
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
      {/* {loading ? (
        <div className="flex flex-col space-y-3 mt-24 items-center">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        geminiResponse &&
        geminiResponse.outfits && (
          <div>
            <ul className="my-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {geminiResponse.outfits?.map((outfit, index) => (
                <li key={index}>
                  <OutfitCard
                    outfit={{
                      outfitOccasion: outfit.outfitOccasion,
                      outfitMainArticle: MainArticle,
                      outfitShoes: outfit.outfitShoes,
                      outfitAccessories: outfit.outfitAccessories,
                      outfitCompleterPiece: outfit.outfitCompleterPiece,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )
      )} */}
    </div>
  );
};

export default StyleSesh;
