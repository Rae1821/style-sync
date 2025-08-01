"use client";

import { MdOutlineClose, MdOutlineDiamond } from "react-icons/md";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { toggleFavoriteOutfit } from "@/actions/auth";
import Image from "next/image";

interface FavOutfitProps {
  favOutfits: {
    id: string;
    userEmail: string | null;
    outfit_occasion: string | null;
    outfit_main_article: string | null;
    outfit_shoes: string | null;
    outfit_accessories: string | null;
    outfit_completer_piece: string | null;
    imageData: string | null;
    favorite: boolean | null;
  }[];
}

const FavoriteOutfits = ({ favOutfits }: FavOutfitProps) => {
  // console.log(favOutfits.imageData);
  // Delete favorite outfit
  const handleDeleteFavorite = async (outfitId: string) => {
    if (!outfitId) {
      console.error("Outfit id is required to delete a favorite.");
      return;
    }
    try {
      // const result = await deleteFavoriteOutfit(outfit);
      const result = await toggleFavoriteOutfit(outfitId);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="relative">
          <div className="text-2xl mb-[-4] font-medium tracking-tighter">
            Favorite Outfits
          </div>
          <div className="flex items-center gap-1 hover:gap-2 transition-all mt-2 w-[160px]">
            <Link
              href="/style-sesh"
              className="text-sm text-muted-foreground hover:underline hover:decoration-2 hover:underline-offset-2 transition-all"
            >
              Find new outfits
            </Link>
            <FaArrowRightLong className="text-muted-foreground hover:cursor-pointer" />
          </div>
        </div>
        <div className="mt-4 flex flex-row gap-4 overflow-x-scroll">
          {favOutfits
            ?.filter((outfit) => outfit.favorite === true)
            .map((outfit) => (
              <div
                className="w-[292px] shrink-0 flex flex-col gap-4 rounded-md border border-gray-200 p-2 shadow bg-white relative"
                key={outfit.id}
              >
                <div className="flex items-center justify-between">
                  <MdOutlineClose
                    className="size-4 absolute top-4 right-2 hover:cursor-pointer"
                    onClick={() => handleDeleteFavorite(outfit.id)}
                  />
                  <h3 className="text-lg font-semibold flex items-center gap-4 mb-2">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-background/20 bg-red-300/15 backdrop-blur-sm">
                      <MdOutlineDiamond className="text-red-300 size-6" />
                    </span>
                    {outfit.outfit_occasion}
                  </h3>
                </div>
                <div className="px-2 flex flex-col gap-2">
                  <div className="product-card_img-container">
                    <Image
                      src={`data:image/png;base64, ${outfit.imageData}`}
                      alt="Gemini generated outfit flatlay"
                      height={300}
                      width={300}
                      className="mx-auto"
                    />
                  </div>
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteOutfits;
