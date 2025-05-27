"use client";

import React from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex w-full">
      <Input
        type="text"
        name="searchItem"
        placeholder="Search styles..."
        className="w-[300px] rounded-r-none border-r-0 focus-visible:ring-0 md:w-[500px] lg:w-[800px]"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Button type="submit">
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
