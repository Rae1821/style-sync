"use client";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { MdOutlineClose, MdOutlineDiamond } from "react-icons/md";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "sonner";
import { deleteFavoriteOutfit } from "@/actions/auth";
// import Image from "next/image";

interface FavOutfitProps {
  favOutfits: {
    id: string;
    userEmail: string;
    outfit_occasion: string | null;
    outfit_main_article: string | null;
    outfit_shoes: string | null;
    outfit_accessories: string | null;
    outfit_completer_piece: string | null;
    imageData: string | null;
  }[];
}

interface DeleteFavOutfitProps {
  id: string;
  userEmail: string;
  outfit_occasion: string | null;
  outfit_main_article: string | null;
  outfit_shoes: string | null;
  outfit_accessories: string | null;
  outfit_completer_piece: string | null;
  imageData: string | null;
}

const FavoriteOutfits = ({ favOutfits }: FavOutfitProps) => {
  const handleDeleteFavorite = async (outfit: DeleteFavOutfitProps) => {
    console.log("Outfit:", outfit);
    if (!outfit.id) {
      console.error("Outfit id is required to delete a favorite.");
      return;
    }
    try {
      const result = await deleteFavoriteOutfit(outfit);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl mb-[-4]">
            Favorite AI Outfit Inspiration
          </CardTitle>
          <div className="flex items-center gap-1 hover:gap-2 transition-all mt-2 w-[150px]">
            <Link
              href="/style-sesh"
              className="text-sm text-red-300 hover:underline hover:decoration-2 hover:underline-offset-2 transition-all"
            >
              Find more ideas
            </Link>
            <FaArrowRightLong className="text-red-300 hover:cursor-pointer" />
          </div>
          <CardContent className="mt-4 flex flex-col gap-2 overflow-y-scroll md:flex-row">
            {favOutfits.map((outfit) => {
              return (
                <div className="product-card" key={outfit.id}>
                  <div className="flex-end relative">
                    <MdOutlineClose
                      className="size-4 absolute top-2 right-2 hover:cursor-pointer"
                      onClick={() =>
                        toast("Outfit removed from favorites", {
                          description:
                            "This outfit has been removed from your favorites.",
                          action: {
                            label: "Undo",
                            onClick: () => handleDeleteFavorite(outfit),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="px-2 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-4 underline decoration-wavy underline-offset-4 decoration-red-300 mb-2">
                      <span className="flex size-12 items-center justify-center rounded-xl border border-background/20 bg-red-300/15 backdrop-blur-sm">
                        <MdOutlineDiamond className="text-red-300 size-6" />
                      </span>
                      {outfit.outfit_occasion}
                    </h3>
                    {/* <Image
                      src={outfit.imageData}
                      alt="Gemini generated outfit flatlay"
                      height={300}
                      width={300}
                      className="mx-auto"
                    /> */}
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Main Item: </span>
                      {outfit.outfit_main_article}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Shoes: </span>
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
                  </div>
                </div>
              );
            })}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default FavoriteOutfits;
