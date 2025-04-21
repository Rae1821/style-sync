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
import { Badge } from "./ui/badge";

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
        <div className=" bg-black rounded-2xl p-2 shadow w-full md:max-w-3/4 lg:max-w-1/2 mx-auto">
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
            <CardContent className="flex flex-col gap-4 items-center">
              <div className="flex flex-col items-center">
                <p className="font-semibold text-center mt-2">
                  Search Term Ideas
                </p>
                {fashionStyle === "Classic" && bodyShape === "Pear" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-3/4 mx-auto mt-4">
                    {bodyShapeTerms.classic.pear.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "classic" && bodyShape === "apple" ? (
                  <div className="">
                    {bodyShapeTerms.classic.apple.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "classic" && bodyShape === "rectangle" ? (
                  <div>
                    {bodyShapeTerms.classic.rectangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "classic" && bodyShape === "hourglass" ? (
                  <div>
                    {bodyShapeTerms.classic.hourglass.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "classic" &&
                  bodyShape === "invertedTriangle" ? (
                  <div>
                    {bodyShapeTerms.classic.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "boho" && bodyShape === "pear" ? (
                  <div>
                    {bodyShapeTerms.boho.pear.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "boho" && bodyShape === "apple" ? (
                  <div>
                    {bodyShapeTerms.boho.apple.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "boho" && bodyShape === "rectangle" ? (
                  <div>
                    {bodyShapeTerms.boho.rectangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "boho" && bodyShape === "hourglass" ? (
                  <div>
                    {bodyShapeTerms.boho.hourglass.map((item) => (
                      <li key={item} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </div>
                ) : fashionStyle === "boho" &&
                  bodyShape === "invertedTriangle" ? (
                  <ul>
                    {bodyShapeTerms.boho.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </ul>
                ) : fashionStyle === "chic" && bodyShape === "pear" ? (
                  <div>
                    {bodyShapeTerms.chic.pear.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "chic" && bodyShape === "apple" ? (
                  <div>
                    {bodyShapeTerms.chic.apple.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "chic" && bodyShape === "rectangle" ? (
                  <div>
                    {bodyShapeTerms.chic.rectangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "chic" && bodyShape === "hourglass" ? (
                  <div>
                    {bodyShapeTerms.chic.hourglass.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "chic" &&
                  bodyShape === "invertedTriangle" ? (
                  <div>
                    {bodyShapeTerms.chic.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "edgy" && bodyShape === "pear" ? (
                  <div>
                    {bodyShapeTerms.edgy.pear.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "edgy" && bodyShape === "apple" ? (
                  <div>
                    {bodyShapeTerms.edgy.apple.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "edgy" && bodyShape === "rectangle" ? (
                  <div>
                    {bodyShapeTerms.edgy.rectangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "edgy" && bodyShape === "hourglass" ? (
                  <div>
                    {bodyShapeTerms.edgy.hourglass.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "edgy" &&
                  bodyShape === "invertedTriangle" ? (
                  <div>
                    {bodyShapeTerms.edgy.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "sporty" && bodyShape === "pear" ? (
                  <div>
                    {bodyShapeTerms.sporty.pear.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "sporty" && bodyShape === "apple" ? (
                  <div>
                    {bodyShapeTerms.sporty.apple.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "sporty" && bodyShape === "rectangle" ? (
                  <div>
                    {bodyShapeTerms.sporty.rectangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "sporty" && bodyShape === "hourglass" ? (
                  <div>
                    {bodyShapeTerms.sporty.hourglass.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "sporty" &&
                  bodyShape === "invertedTriangle" ? (
                  <div>
                    {bodyShapeTerms.sporty.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
                        onClick={() => {
                          setSearchItem(item);
                          handleSearch();
                        }}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
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
