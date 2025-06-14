"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

console.log("SearchInput component loaded");

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked search button");

    if (searchTerm.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set("query", searchTerm.trim());
      replace(`${pathname}?${params.toString()}`);
      setSearchTerm(""); // Clear the input field after submission
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full md:max-w-1/2 mx-auto">
      <Input
        type="text"
        name="searchItem"
        placeholder="Search styles..."
        className="w-full rounded-r-none border-r-0 focus-visible:ring-0 md:w-[500px] lg:w-[800px]"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <Button type="submit" className="bg-red-300">
        <Image
          src="/icons/magnifying-glass.svg"
          className="text-white"
          alt="search"
          height={20}
          width={20}
        />
      </Button>
    </form>
  );
};

export default SearchInput;
