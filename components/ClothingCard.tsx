"use client";

import Image from "next/image";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { Button } from "./ui/button";
import { addFavoriteProduct } from "@/actions/auth";
import { useState } from "react";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface ClothingCardProps {
  product_title: string;
  product_id: string;
  // product_description?: string;
  on_sale: boolean;
  product_photos: string;
  store_name: string;
  product_rating: number;
  product_num_reviews: number;
  offer: {
    offer_page_url: string;
    price: string;
    original_price?: string;
    percentage_off?: string;
    store_name?: string;
  };
}

const ClothingCard = ({ clothing }: { clothing: ClothingCardProps }) => {
  const {
    product_title: productTitle,
    product_rating: productRating,
    product_num_reviews: productNumReviews,
    product_photos: productPhotos,
    offer,
  } = clothing;

  const {
    offer_page_url: productUrl,
    price: productPrice,
    store_name: storeName,
    original_price: productOriginalPrice,
  } = offer;

  const [addFavorite, setAddFavorite] = useState(false);

  const handleAddToFavorites = async (clothing: ClothingCardProps) => {
    // console.log("CLOTHING:", clothing);
    // console.log(addFavoriteProduct);
    try {
      const result = await addFavoriteProduct(clothing);
      console.log(result);
      setAddFavorite((prevAddFavorite) => !prevAddFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(productPhotos[0]);
  console.log(productUrl);

  const newProductTitle = productTitle.replace(/[^\w\s]/gi, "");

  return (
    // <Link href={productUrl} className="product-card">
    <div className="product-card">
      <div className="product-card_img-container">
        <div className="flex flex-row items-center justify-between mb-2">
          <Badge variant="secondary" className="">
            {storeName}
          </Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleAddToFavorites(clothing)}
          >
            {addFavorite ? <FaCheck /> : <FaPlus />}
          </Button>
        </div>
        <Image
          src={productPhotos[0]}
          width={200}
          height={200}
          alt={productTitle}
          className="product-card_img aspect-square object-cover rounded-md transition-transform duration-300 ease-in-out"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="product-title ">{newProductTitle}</h3>
        <div className="relative">
          <p className="flex items-center gap-2 capitalize text-black opacity-50">
            <span>
              <Image
                src="/icons/star.svg"
                width={20}
                height={20}
                alt="star icon"
              />
            </span>
            {productRating} / {productNumReviews}
          </p>
          <p className="text-black absolute top-0 right-0">
            <span>{productPrice}</span>
            <span className="ml-2 font-light text-gray-400 line-through">
              {productOriginalPrice}
            </span>
          </p>
        </div>
      </div>
      <div>
        <Button asChild className="mt-8 w-full bg-red-300">
          <Link href={productUrl} target="_blank">
            See More
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ClothingCard;

// asin:"B010RWDJOY"
// product_title:"Nike Performance Cushion Crew Socks with Band (6 Pairs)"
// product_price:"$25.00"
// unit_price:"$4.17"
// unit_count:6
// product_original_price:"$29.90"
// currency:"USD"
// product_star_rating:"4.6"
// product_num_ratings:15788
// product_url:"https://www.amazon.com/dp/B010RWDJOY"
// product_photo:"https://m.media-amazon.com/images/I/81XwDw-bXpL._AC_SR525,789_FMwebp_QL65_.jpg"
// product_num_offers:null
// product_minimum_offer_price:"$25.00"
// is_best_seller:false
// is_amazon_choice:false
// is_prime:true
// climate_pledge_friendly:false
// sales_volume:"10K+ bought in past month"
// delivery:"FREE delivery Mon, Feb 5 on $35 of items shipped by AmazonOr fastest delivery Thu, Feb 1"
