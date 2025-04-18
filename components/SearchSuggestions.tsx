import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { bodyShapeTerms } from "@/constants";
import { Separator } from "@/components/ui/separator";

type SearchSuggestionProps = {
  userProfile: {
    bodyShape: string;
    fashionStyle: string;
  };
  setSearchItem: (value: string) => void;
  handleSearch: () => void;
};

const SearchSuggestions = ({
  userProfile,
  setSearchItem,
  handleSearch,
}: SearchSuggestionProps) => {
  const { bodyShape, fashionStyle } = userProfile;

  return (
    <div>
      <div className="flex flex-col w-full md:flex-row items-center justify-between gap-4 mt-8">
        <div className=" bg-red-300/80 rounded-2xl p-2 shadow w-full">
          <Card className="w-full radius-xs">
            <CardHeader className="flex flex-row items-center justify-between w-3/4 mx-auto">
              <div className="flex flex-col">
                <CardDescription>Fashion Style</CardDescription>
                <CardTitle className="text-xl mt-[-4]">
                  {fashionStyle}
                </CardTitle>
              </div>
              <div className="flex flex-col">
                <CardDescription>Body Shape</CardDescription>
                <CardTitle className="text-xl mt-[-4]">{bodyShape}</CardTitle>
              </div>
            </CardHeader>
            <div className="w-3/4 mx-auto">
              <Separator className="bg-red-300" />
            </div>
            <CardContent className="flex flex-col gap-4">
              <div>
                <p className="font-semibold text-center mt-2">
                  Search Term Ideas
                </p>
                {fashionStyle === "Classic" && bodyShape === "Pear" ? (
                  <div className="grid grid-cols-2 gap-2 w-3/4 mx-auto mt-4">
                    {bodyShapeTerms.classic.pear.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ) : fashionStyle === "classic" && bodyShape === "apple" ? (
                  <ul className="">
                    {bodyShapeTerms.classic.apple.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "classic" && bodyShape === "rectangle" ? (
                  <ul>
                    {bodyShapeTerms.classic.rectangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "classic" && bodyShape === "hourglass" ? (
                  <ul>
                    {bodyShapeTerms.classic.hourglass.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "classic" &&
                  bodyShape === "invertedTriangle" ? (
                  <ul>
                    {bodyShapeTerms.classic.invertedTriangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "boho" && bodyShape === "pear" ? (
                  <ul>
                    {bodyShapeTerms.boho.pear.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "boho" && bodyShape === "apple" ? (
                  <ul>
                    {bodyShapeTerms.boho.apple.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "boho" && bodyShape === "rectangle" ? (
                  <ul>
                    {bodyShapeTerms.boho.rectangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "boho" && bodyShape === "hourglass" ? (
                  <ul>
                    {bodyShapeTerms.boho.hourglass.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "boho" &&
                  bodyShape === "invertedTriangle" ? (
                  <ul>
                    {bodyShapeTerms.boho.invertedTriangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "chic" && bodyShape === "pear" ? (
                  <ul>
                    {bodyShapeTerms.chic.pear.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "chic" && bodyShape === "apple" ? (
                  <ul>
                    {bodyShapeTerms.chic.apple.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "chic" && bodyShape === "rectangle" ? (
                  <ul>
                    {bodyShapeTerms.chic.rectangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "chic" && bodyShape === "hourglass" ? (
                  <ul>
                    {bodyShapeTerms.chic.hourglass.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "chic" &&
                  bodyShape === "invertedTriangle" ? (
                  <ul>
                    {bodyShapeTerms.chic.invertedTriangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "edgy" && bodyShape === "pear" ? (
                  <ul>
                    {bodyShapeTerms.edgy.pear.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "edgy" && bodyShape === "apple" ? (
                  <ul>
                    {bodyShapeTerms.edgy.apple.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "edgy" && bodyShape === "rectangle" ? (
                  <ul>
                    {bodyShapeTerms.edgy.rectangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "edgy" && bodyShape === "hourglass" ? (
                  <ul>
                    {bodyShapeTerms.edgy.hourglass.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "edgy" &&
                  bodyShape === "invertedTriangle" ? (
                  <ul>
                    {bodyShapeTerms.edgy.invertedTriangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "sporty" && bodyShape === "pear" ? (
                  <ul>
                    {bodyShapeTerms.sporty.pear.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "sporty" && bodyShape === "apple" ? (
                  <ul>
                    {bodyShapeTerms.sporty.apple.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "sporty" && bodyShape === "rectangle" ? (
                  <ul>
                    {bodyShapeTerms.sporty.rectangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "sporty" && bodyShape === "hourglass" ? (
                  <ul>
                    {bodyShapeTerms.sporty.hourglass.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : fashionStyle === "sporty" &&
                  bodyShape === "invertedTriangle" ? (
                  <ul>
                    {bodyShapeTerms.sporty.invertedTriangle.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
