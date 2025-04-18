import React from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";

type SearchInputProps = {
  searchItem: string;
  setSearchItem: (value: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SearchInput = ({
  searchItem,
  setSearchItem,
  handleSearch,
}: SearchInputProps) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="flex w-full">
        <Input
          type="text"
          name="searchItem"
          placeholder="Search styles..."
          className="w-[300px] rounded-r-none border-r-0 focus-visible:ring-0 md:w-[500px] lg:w-[800px]"
          value={searchItem}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchItem(e.target.value)
          }
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
    </form>
  );
};

export default SearchInput;
