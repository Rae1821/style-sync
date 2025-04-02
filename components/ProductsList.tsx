"use client";

import { useEffect, useState } from "react";
import { fetchClothing } from "@/actions/auth";
import ProductSearch from "./ProductSearch";
import ClothingCard from "./ClothingCard";

interface ClothingProps {
  product_title: string;
  product_price: string;
  product_original_price: string;
  currency: string;
  product_star_rating: string;
  product_num_ratings: number;
  product_url: string;
  product_photo: string;
  asin: string;
}

const ProductsList = ({ searchItem }: { searchItem: string }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchItem) {
        const products = await fetchClothing({ searchItem });
        setItems(products);
        console.log(products);
      }
    };
    fetchData();
  }, [searchItem]);

  return (
    <div className="mt-24 max-w-[1300px]">
      <div className="flex justify-center">
        <ProductSearch
          onSearch={(searchTerm: string) =>
            console.log("Search term:", searchTerm)
          }
        />
      </div>
      <ul className="mt-12 flex flex-wrap gap-4">
        {items.map((item: ClothingProps) => (
          <li className="flex" key={item.asin}>
            <ClothingCard clothing={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
