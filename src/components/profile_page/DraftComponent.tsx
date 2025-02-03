"use client";
import React from "react";
import ItemComponent from "./ItemComponent";

const DraftComponent = ({ userId }: any) => {
  return (
    <div className="h-auto p-5 pt-20 flex flex-col gap-5">
      <p className="flex justify-center font-black sm:text-2xl">
        Draft trip with friends ({1})
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {Array.from({ length: 3 }).map((_, index) => ItemComponent())}
      </div>
    </div>
  );
};

export default DraftComponent;
