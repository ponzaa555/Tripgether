"use client";
import React from "react";
import BlogContent from "@/src/components/trip_page/BlogContent";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const MediaComponent = ({ userId }: any) => {
  const blogs = useQuery(api.engagement.getBlogFromBookmark, {
    currentUserId: userId,
  })?.filter((blog) => blog !== null);

  return (
    <div className="bg-white w-full h-80 p-5 py-10 flex flex-col gap-5 sm:h-96 sm:gap-7 lg:h-[30rem]">
      <p className="flex justify-center sm:text-4xl font-black">
        Bookmarks ({blogs?.length})
      </p>
      <BlogContent blogs={blogs || []} />
      {blogs?.length === 0 && (
        <div className="flex justify-center items-center w-full h-full sm:text-lg">
          There is no media to show.
        </div>
      )}
    </div>
  );
};

export default MediaComponent;
