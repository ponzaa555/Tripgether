"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

const AllTripComponent = ({ userId }: any) => {
  const blogs = useQuery(api.blog.getBlogsbyUserId, { authorId: userId });
  const userData = useQuery(api.blog.getBlogsbyUserId, { authorId: userId });
  return (
    <div className="flex flex-col w-full bg-white h-[35rem] gap-5 p-3">
      <div className="flex flex-row justify-between">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </div>
      <h3 className="flex justify-center sm:text-4xl font-black">
        Trip plan ({0})
      </h3>
      <div className="flex justify-center items-center w-full pt-48">
        <p>There is no media to show.</p>
      </div>
    </div>
  );
};

export default AllTripComponent;
