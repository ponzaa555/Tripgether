"use client";

import { api } from "@/convex/_generated/api";
import BlogContent from "@/src/components/trip_page/BlogContent";
import SearchInputComponent from "@/src/components/trip_page/SearchInputComponent";
import { Button } from "@/src/components/UI/Button";
import LoadingComponent from "@/src/components/UI/Loading";
import { usePaginatedQuery } from "convex/react";
import { useState } from "react";
const TripPage = () => {
  const [query, setQuery] = useState("");
  const { results, loadMore, status } = usePaginatedQuery(
    api.blog.infiniteScrollAndSearch,
    { query: query },
    { initialNumItems: 10 }
  );

  function handleSearch(query: string) {
    setQuery(query);
  }

  if (status === "LoadingFirstPage") {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col gap-5 w-full pt-24 pb-5">
      <h3 className="text-center text-3xl sm:text-5xl md:text-6xl font-black">
        Enjoy The Moment
      </h3>
      <div className="px-20 w-full gap-2">
        <SearchInputComponent onSearch={handleSearch} />
      </div>
      <BlogContent blogs={results} />
      <div className="p-10 flex justify-center">
        {status !== "Exhausted" ? (
          <Button
            onClick={() => loadMore(10)}
            disabled={status !== "CanLoadMore"}
          >
            {status === "CanLoadMore" ? "Load More" : "Loading..."}
          </Button>
        ) : (
          <p className="text-3xl">----- No data available -----</p>
        )}
      </div>
    </div>
  );
};

export default TripPage;
