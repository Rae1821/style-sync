"use client";

import {
  addFavoriteOutfit,
  geminiImageUpload,
  generateOutfitImage,
} from "@/actions/auth";
import { UploadButton } from "@/utils/uploadthing";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { IoMdCheckmark, IoMdAdd } from "react-icons/io";
import { MdOutlineDiamond } from "react-icons/md";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Image from "next/image";
import { toast } from "sonner";

interface ProfileDetails {
  id: string | null;
  email: string | null;
  name: string | null;
  bodyShape: string | null;
  fashionStyle: string | null;
}

interface GeminiResponse {
  outfit_occasion: string;
  outfit_main_article: string;
  outfit_shoes: string;
  outfit_accessories: string;
  outfit_completer_piece: string;
}

const StyleSesh = ({ userProfile }: { userProfile: ProfileDetails }) => {
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse>({
    outfit_occasion: "",
    outfit_main_article: "",
    outfit_shoes: "",
    outfit_accessories: "",
    outfit_completer_piece: "",
  });
  const [loading, setLoading] = useState(false);
  const [occasionValue, setOccasionValue] = useState("");
  const [addFavorite, setAddFavorite] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);

  const bodyShape = userProfile?.bodyShape;
  const fashionStyle = userProfile?.fashionStyle;

  const handleUploadComplete = async (res: { ufsUrl: string }[]) => {
    try {
      setLoading(true);
      const result = await geminiImageUpload(
        res[0]?.ufsUrl,
        bodyShape || "",
        fashionStyle || "",
        occasionValue || ""
      );
      setGeminiResponse(result);
      const outfitResult = await handleGenerateOutfitImages(result);

      return outfitResult;
      // console.log(result);
      setLoading(false);
      // console.log("Gemini AI action triggered");
      // console.log("Response:", result);
      //   return responseText;
    } catch (error) {
      console.error("Error uploading image:", error);
      // setLoading(false);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      if (imageData) {
        await addFavoriteOutfit(geminiResponse, imageData);
        toast("Added to favorites", {
          action: {
            label: "Okay",
            onClick: () => {
              console.log("Okay clicked");
            },
          },
        });
      }

      setAddFavorite((prevAddFavorite) => !prevAddFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(geminiResponse.outfits);

  interface OutfitResult {
    outfit_occasion: string;
    outfit_main_article: string;
    outfit_shoes: string;
    outfit_accessories: string;
    outfit_completer_piece: string;
  }

  const handleGenerateOutfitImages = async (outfit: OutfitResult) => {
    try {
      const imageResult = await generateOutfitImage(outfit);
      // console.log(imageResult);
      setImageData(imageResult);
    } catch (error) {
      console.error("Error generating outfit images:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-baseline">
        <>
          <Select value={occasionValue} onValueChange={setOccasionValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="date-night">Date Night</SelectItem>
              <SelectItem value="special-event">Special Event</SelectItem>
              <SelectItem value="vacation">Vacation</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="weekend">Weekend</SelectItem>
            </SelectContent>
          </Select>
        </>

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
        geminiResponse.outfit_occasion &&
        geminiResponse.outfit_main_article &&
        geminiResponse.outfit_shoes &&
        geminiResponse.outfit_accessories &&
        geminiResponse.outfit_completer_piece && (
          <div className="mb-8 max-w-2xl mx-auto">
            <Card className="mt-12">
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-background/20 bg-red-300/15 backdrop-blur-sm">
                    <MdOutlineDiamond className="text-red-300 size-6" />
                  </span>
                  <h2 className="text-lg font-semibold">
                    {geminiResponse.outfit_occasion}
                  </h2>
                </CardTitle>
                <Button
                  className="absolute top-0 right-2 p-0"
                  variant="ghost"
                  onClick={() => handleAddToFavorites()}
                >
                  {addFavorite ? (
                    <IoMdCheckmark className="text-red-300 w-6 h-6" />
                  ) : (
                    <IoMdAdd className="text-red-300 w-6 h-6" />
                  )}
                </Button>
                <CardContent className="mt-4">
                  <Image
                    src={`data:image/png;base64, ${imageData}`}
                    alt="Gemini generated outfit flatlay"
                    height={300}
                    width={300}
                    className="mx-auto"
                  />
                  <p className="text-sm mb-2 mt-8">
                    <span className="font-semibold">Main Item: </span>
                    {geminiResponse.outfit_main_article}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Shoes: </span>{" "}
                    {geminiResponse.outfit_shoes}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Accessories: </span>
                    {geminiResponse.outfit_accessories}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Completer piece: </span>
                    {geminiResponse.outfit_completer_piece}
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
            {/* <ul className="my-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
            </ul> */}
          </div>
        )
      )}
    </div>
  );
};

export default StyleSesh;
