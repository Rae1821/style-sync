import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { bodyShapeTerms } from "@/constants";
import { Badge } from "./ui/badge";

interface userProfileProps {
  bodyShape: string;
  fashionStyle: string;
}

const SearchSuggestions = ({
  userProfile,
}: {
  userProfile: userProfileProps;
}) => {
  const { bodyShape, fashionStyle } = userProfile;

  return (
    <div>
      <div className="flex flex-col w-full md:flex-row items-center justify-between gap-4 mt-8">
        <div className="bg-muted rounded-2xl p-2 shadow w-full md:max-w-3/4 lg:max-w-1/2 mx-auto lg:mx-0">
          <Card className="w-full radius-xs">
            <CardHeader className="flex flex-row items-center justify-between w-3/4 mx-auto border-b-2 border-red-300 pb-4">
              <div className="flex flex-col">
                <CardDescription className="text-sm">
                  Body Shape
                </CardDescription>
                <CardTitle className="text-xl mt-[-4] tracking-tight">
                  {bodyShape}
                </CardTitle>
              </div>
              <div className="flex flex-col">
                <CardDescription className="text-sm">
                  Fashion Style
                </CardDescription>
                <CardTitle className="text-xl mt-[-4] tracking-tight">
                  {fashionStyle}
                </CardTitle>
              </div>
            </CardHeader>
            {/* <div className="w-3/4 mx-auto">
              <Separator className="bg-red-300" />
            </div> */}
            <CardContent className="flex flex-col gap-4 items-center">
              <div className="flex flex-col items-center px-2">
                <p className="font-semibold text-center mb-4">
                  Search Term Suggestions
                </p>

                {fashionStyle === "Classic" && bodyShape === "Pear" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.classic.pear.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Classic" && bodyShape === "Apple" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.classic.apple.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Classic" && bodyShape === "Rectangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.classic.rectangle.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Classic" && bodyShape === "Hourglass" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.classic.hourglass.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Classic" &&
                  bodyShape === "Inverted Triangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.classic.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Boho" && bodyShape === "Pear" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.boho.pear.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300 px-1"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Boho" && bodyShape === "Apple" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.boho.apple.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Boho" && bodyShape === "Rectangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.boho.rectangle.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300 "
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Boho" && bodyShape === "Hourglass" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.boho.hourglass.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Boho" &&
                  bodyShape === "Inverted Triangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.boho.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Chic" && bodyShape === "Pear" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.chic.pear.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Chic" && bodyShape === "Apple" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.chic.apple.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Chic" && bodyShape === "Rectangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.chic.rectangle.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Chic" && bodyShape === "Hourglass" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.chic.hourglass.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Chic" &&
                  bodyShape === "Inverted Triangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.chic.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Edgy" && bodyShape === "Pear" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.edgy.pear.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Edgy" && bodyShape === "Apple" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.edgy.apple.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Edgy" && bodyShape === "Rectangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.edgy.rectangle.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Edgy" && bodyShape === "Hourglass" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.edgy.hourglass.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Edgy" &&
                  bodyShape === "Inverted Triangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.edgy.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Sporty" && bodyShape === "Pear" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.sporty.pear.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Sporty" && bodyShape === "Apple" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.sporty.apple.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Sporty" && bodyShape === "Rectangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.sporty.rectangle.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Sporty" && bodyShape === "Hourglass" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.sporty.hourglass.map((item) => (
                      <Badge
                        key={item}
                        className="text-sm bg-transparent text-black border-2 border-black cursor-pointer hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:shadow-red-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : fashionStyle === "Sporty" &&
                  bodyShape === "Inverted Triangle" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {bodyShapeTerms.sporty.invertedTriangle.map((item) => (
                      <Badge
                        key={item}
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
