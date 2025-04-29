"use client";

import { geminiImageUpload } from "@/actions/auth";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { MdOutlineDiamond } from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProfileDetails {
  id: string | null;
  email: string | null;
  name: string | null;
  bodyShape: string | null;
  fashionStyle: string | null;
}

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

const StyleSesh = ({ userProfile }: { userProfile: ProfileDetails }) => {
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse>({});
  const [loading, setLoading] = useState(false);
  const bodyShape = userProfile?.bodyShape;
  const fashionStyle = userProfile?.fashionStyle;

  const handleUploadComplete = async (res: { ufsUrl: string }[]) => {
    try {
      setLoading(true);
      const result = await geminiImageUpload(
        res[0]?.ufsUrl,
        bodyShape || "",
        fashionStyle || ""
      );
      setGeminiResponse(result);
      setLoading(false);
      console.log("Gemini AI action triggered");
      console.log("Response:", result);
      //   return responseText;
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  console.log(geminiResponse.outfits);

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
      {loading ? (
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
          <div className="my-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {geminiResponse.outfits?.map((outfit, index) => (
              <ul key={index} className="mt-8">
                <li>
                  <Card className="h-[220px]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MdOutlineDiamond className="text-red-300 size-6" />
                        <h2 className="text-lg font-semibold">
                          {outfit.outfitOccasion}
                        </h2>
                      </CardTitle>
                      <CardContent>
                        <p className="text-sm mb-2">
                          <span className="font-semibold">Main Item: </span>
                          {outfit.mainArticle}
                        </p>
                        <p className="text-sm mb-2">
                          <span className="font-semibold">Shoes: </span>{" "}
                          {outfit.shoes}
                        </p>
                        <p className="text-sm mb-2">
                          <span className="font-semibold">Accessories: </span>
                          {outfit.accessories}
                        </p>
                        <p className="text-sm mb-2">
                          <span className="font-semibold">
                            Completer piece:{" "}
                          </span>
                          {outfit.completerPiece}
                        </p>
                      </CardContent>
                    </CardHeader>
                  </Card>
                </li>
              </ul>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default StyleSesh;
