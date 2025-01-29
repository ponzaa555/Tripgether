import React, { useRef } from "react";
import { Input } from "@/src/components/UI/input";
import { Button } from "@/src/components/UI/Button";

type SearchInputProps = {
  onSearch: (query: string) => void;
};

const SearchInputComponent = ({ onSearch }: SearchInputProps) => {
  const queryRef = useRef<HTMLInputElement>(null);

  function handleSearch() {
    if (queryRef.current) {
      onSearch(queryRef.current.value);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="w-full">
      <Input ref={queryRef} placeholder="Search" onKeyDown={handleKeyDown} />
    </div>
  );
};

export default SearchInputComponent;
