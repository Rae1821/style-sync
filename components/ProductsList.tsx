"use client";

import { useEffect, useState } from "react";
import { fetchClothing } from "@/actions/auth";
import ClothingCard from "./ClothingCard";
import { Skeleton } from "./ui/skeleton";

interface ClothingProps {
  product_title: string;
  product_id: string;
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

// const ProductsList = ({ searchItem }: { searchItem: string }) => {
const ProductsList = ({ query }: { query: string }) => {
  // const [items, setItems] = useState([]);
  const [products, setProducts] = useState<ClothingProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim()) return; // If the query is empty, do not fetch products
      setLoading(true);
      try {
        const fetchedProducts = await fetchClothing({ searchItem: query });
        setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]); // Run the effect whenever the query changes

  return (
    <div className="mt-24 max-w-[1300px]">
      {loading && <Skeleton className="h-96 w-full" />}
      {!loading && products.length === 0 && query && (
        <p>No Products found for &quot;{query}&quot;.</p>
      )}

      <ul className="mt-12 flex flex-wrap items-center justify-center gap-4 mx-auto">
        {products?.map((item: ClothingProps) => (
          <li className="flex" key={item.product_id}>
            <ClothingCard clothing={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
