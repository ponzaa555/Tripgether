"use client";

import BlogContent from "@/src/components/home_page/blog_content/BlogContent";
import { Input } from "@/src/components/UI/input";
import useTripSearch from "@/src/hooks/useTripSearch";
import { useState } from "react";

const TripPage = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, trips, hasMore } = useTripSearch(query, pageNumber);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col gap-5 w-full pt-10">
      <h3 className="text-center text-3xl sm:text-5xl md:text-6xl font-black">
        Enjoy The Moment
      </h3>
      <div className="px-20">
        <Input
          className="w-full"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
      <BlogContent />
    </div>
  );
};

export default TripPage;
