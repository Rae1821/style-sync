"use client";

import {
  addOutfit,
  findUniqueOutfits,
  geminiImageUpload,
  generateOutfitImage,
  toggleFavoriteOutfit,
} from "@/actions/auth";
import { UploadButton } from "@/utils/uploadthing";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { MdOutlineDiamond } from "react-icons/md";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Image from "next/image";

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

interface OutfitProps {
  id: string;
  outfit_occasion: string | null;
  outfit_main_article: string | null;
  outfit_shoes: string | null;
  outfit_accessories: string | null;
  outfit_completer_piece: string | null;
  imageData: string | null;
  favorite: boolean | null;
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
  const [outfits, setOutfits] = useState<OutfitProps[]>([]);

  const bodyShape = userProfile?.bodyShape;
  const fashionStyle = userProfile?.fashionStyle;

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await findUniqueOutfits();

        setOutfits(
          response.map((outfit: OutfitProps) => ({
            id: outfit.id ?? "",
            outfit_occasion: outfit.outfit_occasion ?? "",
            outfit_main_article: outfit.outfit_main_article ?? "",
            outfit_shoes: outfit.outfit_shoes ?? "",
            outfit_accessories: outfit.outfit_accessories ?? "",
            outfit_completer_piece: outfit.outfit_completer_piece ?? "",
            imageData: outfit.imageData ?? "",
            favorite: outfit.favorite ?? false,
          }))
        );
      } catch (error) {
        console.error("Error fetching outfits:", error);
      }
    };

    fetchOutfits();
  }, []);

  const handleUploadComplete = async (res: { ufsUrl: string }[]) => {
    try {
      setLoading(true);
      const result = await geminiImageUpload(
        res[0]?.ufsUrl,
        bodyShape || "",
        fashionStyle || "",
        occasionValue || ""
      );
      console.log(result);
      setGeminiResponse(result);
      const outfitResult = await handleGenerateOutfitImages(result);

      return outfitResult;
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const handleAddToFavorites = async (outfitId: string) => {
    try {
      const result = await toggleFavoriteOutfit(outfitId);
      console.log(result);

      setAddFavorite((prevAddFavorite) => !prevAddFavorite);
    } catch (error) {
      console.log(error);
    }
  };

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

      setImageData(imageResult);
      await addOutfit(outfit, imageResult);
      setLoading(false);
    } catch (error) {
      console.error("Error generating outfit images:", error);
    }
  };

  const handleStartOver = () => {
    setOccasionValue("");
    setGeminiResponse({
      outfit_occasion: "",
      outfit_main_article: "",
      outfit_shoes: "",
      outfit_accessories: "",
      outfit_completer_piece: "",
    });
    setImageData(null);
    setLoading(false);
  };

  console.log("Outfits:", outfits);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-baseline">
        <div className="flex flex-col items-center justify-start">
          <Select value={occasionValue} onValueChange={setOccasionValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Casual">Casual</SelectItem>
              <SelectItem value="Date Night">Date Night</SelectItem>
              <SelectItem value="Special Event">Special Event</SelectItem>
              <SelectItem value="Vacation">Vacation</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Weekend">Weekend</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Button
              onClick={handleStartOver}
              variant="link"
              className="text-xs text-gray-500 pt-0"
            >
              Start Over
            </Button>
          </div>
        </div>

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
        geminiResponse.outfit_occasion !== "" &&
        geminiResponse.outfit_main_article !== "" &&
        geminiResponse.outfit_shoes !== "" &&
        geminiResponse.outfit_accessories !== "" &&
        geminiResponse.outfit_completer_piece !== "" && (
          <div className="mb-8 max-w-2xl mx-auto">
            <Card className="mt-12">
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-background/20 bg-red-300/15 backdrop-blur-sm">
                    <MdOutlineDiamond className="text-red-300 size-6" />
                  </span>
                  <h2 className="text-lg font-semibold">
                    {geminiResponse.outfit_occasion} Outfit
                  </h2>
                </CardTitle>
                <Button
                  variant="ghost"
                  className="absolute top-0 right-4 p-0 text-xs px-2 hover:cursor-pointer transition-all hover:bg-red-300/50"
                  // onClick={() => handleAddToFavorites(outfits.id)}
                >
                  {addFavorite ? "Remove from favorites" : "Add to favorites"}
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
          </div>
        )
      )}
      <div className="mt-24">
        <h2 className="text-xl font-semibold tracking-tight mb-2">
          Previous Suggestions
        </h2>
        <div className="mb-8 flex flex-col gap-4">
          {!outfits || outfits.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nothing to see yet...Upload an image and select an occasion to get
              started!
            </p>
          ) : (
            outfits.map((outfit) => (
              <Card key={outfit.id} className="max-w-[350px]">
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-background/20 bg-red-300/15 backdrop-blur-sm">
                      <MdOutlineDiamond className="text-red-300 size-6" />
                    </span>
                    <h2 className="text-lg font-semibold">
                      {outfit.outfit_occasion}
                    </h2>
                  </CardTitle>
                  <Button
                    variant="outline"
                    className="absolute top-0 right-4 p-0 text-xs px-2 hover:cursor-pointer transition-all"
                    onClick={() => handleAddToFavorites(outfit.id)}
                  >
                    {addFavorite || outfit.favorite
                      ? "Remove from favorites"
                      : "Add to favorites"}
                  </Button>
                  <CardContent className="mt-4">
                    <Image
                      src={`data:image/png;base64, ${outfit.imageData}`}
                      alt="Gemini generated outfit flatlay"
                      height={300}
                      width={300}
                      className="mx-auto"
                    />
                    <p className="text-sm mb-2 mt-8">
                      <span className="font-semibold">Main Item: </span>
                      {outfit.outfit_main_article}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Shoes: </span>{" "}
                      {outfit.outfit_shoes}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Accessories: </span>
                      {outfit.outfit_accessories}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Completer piece: </span>
                      {outfit.outfit_completer_piece}
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StyleSesh;
