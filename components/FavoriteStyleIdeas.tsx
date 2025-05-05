import React from "react";
import { MdOutlineDiamond } from "react-icons/md";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface favOutfitProps {
  favOutfits: {
    id?: string;
    userEmail?: string;
    outfitOccasion?: string | null;
    mainArticle?: string | null;
    shoes?: string | null;
    accessories?: string | null;
    completerPiece?: string | null;
  }[];
}

const FavoriteStyleIdeas = ({ favOutfits }: favOutfitProps) => {
  return (
    <div>
      <Card className="h-[220px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MdOutlineDiamond className="text-red-300 size-6" />
            <h2 className="text-2xl">AI Outfit Suggestion</h2>
          </CardTitle>
          <CardContent>
            {favOutfits.map((outfit) => (
              <div className="" key={outfit.id}>
                <h3 className="text-lg font-semibold">
                  {outfit.outfitOccasion}
                </h3>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Main Item: </span>
                  {outfit.mainArticle}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Shoes: </span>
                  {outfit.shoes}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Accessories: </span>
                  {outfit.accessories}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Completer piece: </span>
                  {outfit.completerPiece}
                </p>
              </div>
            ))}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default FavoriteStyleIdeas;
