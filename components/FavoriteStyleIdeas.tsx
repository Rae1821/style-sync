import React from "react";
import { MdOutlineDiamond } from "react-icons/md";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

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

interface DeleteFavOutfitProps {
  id?: string;
  userEmail?: string;
  outfitOccasion?: string | null;
  mainArticle?: string | null;
  shoes?: string | null;
  accessories?: string | null;
  completerPiece?: string | null;
}

const FavoriteStyleIdeas = ({ favOutfits }: favOutfitProps) => {
  const handleDeleteFavorite = async (outfit: DeleteFavOutfitProps) => {
    console.log("Outfit:", outfit);
    try {
      // const result = await deleteFavoriteOutfit(outfit);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="h-[220px]">
        <CardHeader>
          <CardTitle className="text-xl mb-[-4]">
            Favorite AI Outfit Ideas
          </CardTitle>
          <Button
            className="absolute top-0 right-2 p-0"
            variant="ghost"
            onClick={() => handleDeleteFavorite(outfit)}
          >
            {addFavorite ? (
              <IoMdCheckmark className="text-red-300 w-6 h-6" />
            ) : (
              <IoMdAdd className="text-red-300 w-6 h-6" />
            )}
          </Button>
          <CardContent className="mt-4 flex flex-col gap-2 overflow-y-scroll md:flex-row">
            {favOutfits.map((outfit) => (
              <div className="product-card" key={outfit.id}>
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
