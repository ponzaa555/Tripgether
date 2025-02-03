"use client";
import React from "react";
import ItemComponent from "./ItemComponent";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const DraftComponent = ({ userId }: any) => {
  const data = useQuery(api.draft.queryDraftByUserId, { membersId: userId });
  return (
    <div className="h-auto p-5 pt-20 flex flex-col gap-5">
      <p className="flex justify-center font-black sm:text-2xl">
        Draft trip with friends ({data?.length})
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {data?.map((draft, index) => <ItemComponent key={index} {...draft} />)}
      </div>
    </div>
  );
};

export default DraftComponent;
