"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((searchTerm) => {
    console.log(`Searching... ${searchTerm}`);

    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    setSearchTerm("");
  }, 300);

  return (
    <div className="flex w-full lg:max-w-1/2">
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
      <Button
        onClick={() => handleSearch(searchTerm)}
        type="submit"
        className="bg-red-300"
      >
        <Image
          src="/icons/magnifying-glass.svg"
          className="text-white"
          alt="search"
          height={20}
          width={20}
        />
      </Button>
    </div>
  );
};

export default SearchInput;
