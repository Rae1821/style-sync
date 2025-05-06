import { MdOutlineDiamond } from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { IoMdAdd } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { Button } from "./ui/button";
import { useState } from "react";
import { addFavoriteOutfit } from "@/actions/auth";
import { toast } from "sonner";

interface OutfitProps {
  outfitOccasion: string;
  outfitMainArticle: string;
  outfitShoes: string;
  outfitAccessories: string;
  outfitCompleterPiece: string;
}

const OutfitCard = ({ outfit }: { outfit: OutfitProps }) => {
  const {
    outfitOccasion,
    outfitMainArticle,
    outfitShoes,
    outfitAccessories,
    outfitCompleterPiece,
  } = outfit;

  const [addFavorite, setAddFavorite] = useState(false);

  const handleAddToFavorites = async (outfit: OutfitProps) => {
    try {
      const result = await addFavoriteOutfit(outfit);
      toast("Added to favorites", {
        action: {
          label: "Okay",
          onClick: () => {
            console.log("Okay clicked");
          },
        },
      });

      console.log(result);
      setAddFavorite((prevAddFavorite) => !prevAddFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="h-[300px]">
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <span className="flex size-12 items-center justify-center rounded-xl border border-background/20 bg-red-300/15 backdrop-blur-sm">
              <MdOutlineDiamond className="text-red-300 size-6" />
            </span>
            <h2 className="text-lg font-semibold">{outfitOccasion}</h2>
          </CardTitle>
          <Button
            className="absolute top-0 right-2 p-0"
            variant="ghost"
            onClick={() => handleAddToFavorites(outfit)}
          >
            {addFavorite ? (
              <IoMdCheckmark className="text-red-300 w-6 h-6" />
            ) : (
              <IoMdAdd className="text-red-300 w-6 h-6" />
            )}
          </Button>
          <CardContent>
            <p className="text-sm mb-2 mt-4">
              <span className="font-semibold">Main Item: </span>
              {outfitMainArticle}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Shoes: </span> {outfitShoes}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Accessories: </span>
              {outfitAccessories}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Completer piece: </span>
              {outfitCompleterPiece}
            </p>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default OutfitCard;
