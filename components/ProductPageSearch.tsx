"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";
import ProductsList from "./ProductsList";

type ProductPageProps = {
  searchItem: string;
  userProfile: {
    bodyShape: string;
    fashionStyle: string;
  };
};

// const ProductPageSearch: React.FC<ProductSearchProps> = () => {
const ProductPageSearch = ({
  searchItem: initialSearch,
  userProfile,
}: ProductPageProps) => {
  const [searchItem, setSearchItem] = useState<string>(initialSearch);
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (searchItem.trim()) {
      router.push(`/products?searchItem=${encodeURIComponent(searchItem)}`);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div>
        <SearchSuggestions
          userProfile={userProfile}
          setSearchItem={setSearchItem}
          handleSearch={handleSearch}
        />
      </div>
      <div className="mt-10">
        <SearchInput
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          handleSearch={handleSearch}
        />
      </div>
      <div className="mt-4">
        <ProductsList searchItem={searchItem} />
      </div>
    </div>
  );
};

export default ProductPageSearch;
