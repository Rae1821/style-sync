"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { deleteFavoriteProduct } from "@/actions/auth";
import { IoMdCloseCircle } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

interface DeleteFavoriteProduct {
  id?: string;
  product_title?: string | null;
  product_price?: string | null;
  product_original_price?: string | null;
  product_star_rating?: string | null;
  product_num_ratings?: number | null;
  product_url?: string | null;
  product_photo?: string | null;
  asin?: string | null;
}

interface FavoriteProductsProps {
  favProducts: {
    id?: string;
    userEmail?: string;
    product_title?: string | null;
    product_price?: string | null;
    product_original_price?: string | null;
    product_star_rating?: string | null;
    product_num_ratings?: number | null;
    product_url?: string | null;
    product_photo?: string | null;
    asin?: string | null;
  }[];
}

const FavoriteProducts = ({ favProducts }: FavoriteProductsProps) => {
  const handleDeleteFavorite = async (product: DeleteFavoriteProduct) => {
    console.log("Product:", product);
    try {
      const result = await deleteFavoriteProduct(product);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="relative">
          <CardTitle className="text-xl mb-[-4]">Favorite Products</CardTitle>
          <div className="flex items-center justify-between mt-2 w-[150px]">
            <Link href="/products" className="text-sm text-red-300">
              Find new products
            </Link>
            <FaArrowRightLong className="text-red-300 hover:cursor-pointer" />
          </div>

          {/* <Button
            asChild
            variant="outline"
            className="w-1/2 md:w-1/4 mt-4 border-4 py-4 font-semibold border-black rounded-none hover:bg-red-300 transition duration-300 ease-out absolute top-0 right-6"
          >
            <Link href="/products">Find New Products</Link>
          </Button> */}
        </CardHeader>
        <CardContent className="mt-4 flex flex-col gap-4 overflow-y-scroll md:flex-row ">
          {favProducts?.map((product) => (
            <div
              className="product-card bg-red-300"
              key={product.product_title}
            >
              <div className="product-card_img-container">
                <div className="flex justify-end"></div>
                <Image
                  src={product.product_photo || "/images/logo-2.jpg"}
                  width={200}
                  height={200}
                  alt={`${product.product_title}`}
                  className="product-card_img"
                />
                <IoMdCloseCircle
                  className="absolute right-2 top-2 size-6 cursor-pointer text-red-300"
                  onClick={() => handleDeleteFavorite(product)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="product-title">
                  {(product.product_title ?? "").replace(/[^\w\s]/gi, "")}
                </h3>
                <div className="flex justify-between">
                  <p className="flex items-center gap-2 capitalize text-black opacity-50">
                    <span>
                      <Image
                        src="/icons/star.svg"
                        width={20}
                        height={20}
                        alt="star icon"
                      />
                    </span>
                    {product.product_star_rating} /{" "}
                    {product.product_num_ratings}
                  </p>
                  <p className="font-semibold text-black">
                    <span>{product.product_price}</span>
                    <span className="ml-2 font-light text-gray-400 line-through">
                      {product.product_original_price}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <Button asChild className="mt-4 w-full bg-red-300">
                  {product.product_url ? (
                    <Link href={product.product_url}>See More</Link>
                  ) : (
                    <span>See More</span>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default FavoriteProducts;
