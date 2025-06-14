"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { deleteFavoriteProduct } from "@/actions/auth";
// import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { Badge } from "./ui/badge";
import { FaArrowRightLong } from "react-icons/fa6";

interface DeleteFavoriteProduct {
  id?: string;
  userEmail?: string;
  product_title?: string;
  product_photo?: string;
  store_name?: string;
  product_price?: string;
  product_original_price?: string;
  product_url?: string;
  product_rating?: number;
  product_num_reviews?: number;
}

interface FavoriteProductsProps {
  favProducts: {
    id?: string;
    userEmail?: string;
    product_title?: string;
    product_price?: string;
    product_original_price?: string;
    product_url?: string;
    product_photo?: string;
    store_name?: string;
    product_rating?: number;
    product_num_reviews?: number;
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
    <div className="">
      <div className="container">
        <div className="relative">
          <div className="text-2xl mb-[-4] font-medium tracking-tighter">
            Favorite Products
          </div>
          <div className="flex items-center gap-1 hover:gap-2 transition-all mt-2 w-[160px]">
            <Link
              href="/products"
              className="text-sm text-muted-foreground hover:underline hover:decoration-2 hover:underline-offset-2 transition-all"
            >
              Find new products
            </Link>
            <FaArrowRightLong className="text-muted-foreground hover:cursor-pointer" />
          </div>
        </div>
        <div className="mt-4 flex flex-row gap-4 overflow-x-scroll">
          {favProducts?.map((product) => (
            <div
              className="product-card bg-red-300"
              key={product.product_title}
            >
              <div className="relative flex justify-between items-center py-2">
                {/* <Badge>{product.store_name}</Badge>
                 */}
                <Badge variant="outline" className="bg-red-300/80">
                  {product.store_name || "Unknown Store"}
                </Badge>
                <MdOutlineClose
                  className="absolute right-2 top-2 size-4 cursor-pointer"
                  onClick={() => handleDeleteFavorite(product)}
                />
              </div>
              <div className="product-card_img-container">
                <Image
                  src={product.product_photo || "/placeholder.png"}
                  width={200}
                  height={200}
                  alt={`${product.product_title}`}
                  className="product-card_img"
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
                    {product.product_rating} / {product.product_num_reviews}
                  </p>
                  <p className="font-semibold text-black">
                    <span>{product.product_price}</span>
                    <span className="ml-2 font-light text-gray-400 line-through">
                      {product.product_original_price}
                    </span>
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full bg-transparent hover:bg-red-300 font-semibold tracking-tight text-black mt-4 rounded-none border-4 border-black"
                >
                  {product.product_url ? (
                    <Link href={product.product_url}>See More</Link>
                  ) : (
                    <span>See More</span>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div>
        <h2 className="text-xl mb-[-4]">Favorite Products</h2>
        <div className="flex items-center gap-1 hover:gap-2 transition-all mt-2 w-[160px]">
          <Link
            href="/products"
            className="text-sm text-muted-foreground hover:underline hover:decoration-2 hover:underline-offset-2 transition-all"
          >
            Find new products
          </Link>
          <FaArrowRightLong className="text-muted-foreground hover:cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-col gap-4 overflow-y-scroll md:flex-row">
          {favProducts?.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {product.product_title}
                </CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {product.store_name}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteFavorite(product)}
                  >
                    <MdOutlineClose />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="">
                  <Image
                    src={product.product_photo}
                    width={200}
                    height={200}
                    alt={`${product.product_title}`}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  <MdOutlineClose
                    className="absolute right-2 top-2 size-4 cursor-pointer"
                    onClick={() => handleDeleteFavorite(product)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default FavoriteProducts;
