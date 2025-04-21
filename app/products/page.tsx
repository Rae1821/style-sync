import ProductPageSearch from "@/components/ProductPageSearch";
import ProductsList from "@/components/ProductsList";
import { db } from "@/db";
import { cookies } from "next/headers";
import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { bodyShapeTerms } from "@/constants";
// import { Separator } from "@/components/ui/separator";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { searchItem?: string };
}) => {
  const searchItem = searchParams.searchItem || "";

  const userCookies = await cookies();
  const user = userCookies.get("user");
  const userData = user ? JSON.parse(user.value) : null;
  const userEmail = userData?.email;

  if (!userEmail) {
    throw new Error("User not found");
  }
  // Fetch user data from the database
  const userProfile = await db.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  if (!userProfile) {
    throw new Error("User not found");
  }

  const userProfileData = {
    bodyShape: userProfile?.bodyShape || "",
    fashionStyle: userProfile?.fashionStyle || "",
  };

  return (
    <div className="container mx-auto max-w-[1300px] px-8 md:px-12 mt-4">
      <div className="">
        <div className="">
          <h2 className="text-3xl bg-gradient-to-r from-red-300 to-red-50 font-semibold leading-normal bg-clip-text text-transparent">
            Product Search
          </h2>
          <p className="mt-2 text-sm font-normal tracking-tight">
            Use the search box below to find items that are perfect for your
            body shape and fashion style.
          </p>
          <p className="mt-2 text-sm font-normal tracking-tight">
            Click the plus icon at the top of each products to save it to the
            favorites section on your dashboard.
          </p>
        </div>
        <div className="mt-4">
          <ProductPageSearch
            searchItem={searchItem}
            userProfile={userProfileData}
          />
        </div>

        {/* rounded-[calc(var(--card-radius)-var(--card-padding)))] */}

        {/* Card Section  */}
        {/* <div className="flex flex-col w-full md:flex-row items-center justify-between gap-4 mt-8">
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
                    <ul className="grid grid-cols-2 gap-2 w-3/4 mx-auto mt-4">
                      {bodyShapeTerms.classic.pear.map((item) => (
                        <li key={item} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : fashionStyle === "classic" && bodyShape === "apple" ? (
                    <ul className="">
                      {bodyShapeTerms.classic.apple.map((item) => (
                        <li key={item} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : fashionStyle === "classic" &&
                    bodyShape === "rectangle" ? (
                    <ul>
                      {bodyShapeTerms.classic.rectangle.map((item) => (
                        <li key={item} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : fashionStyle === "classic" &&
                    bodyShape === "hourglass" ? (
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
        </div> */}
      </div>
      <div className="mt-24 max-w-[1300px]">
        <ProductsList searchItem={searchItem || ""} />
      </div>
    </div>
  );
};

export default ProductsPage;
