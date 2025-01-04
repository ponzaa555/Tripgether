"use client";
import React, { useState } from "react";
import { Button } from "@/src/components/UI/Button";
import ItemComponent from "./ItemComponent";

const DraftComponent = () => {
  const [draft, setDraft] = useState("draft");
  return (
    <div className="h-auto p-5 pt-20 flex flex-col gap-5">
      <p className="flex justify-center font-black sm:text-2xl">
        My draft trip ({1})
      </p>
      <nav>
        <ul className="flex justify-center gap-5">
          <li>
            <Button
              variant="link"
              className={`transition duration-300 ease-in-out  ${draft === "draft" ? "bg-orange-400 text-white" : "text-black"} `}
              onClick={() => setDraft("draft")}
            >
              Draft ({1})
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className={`transition duration-300 ease-in-out  ${draft === "reject" ? "bg-orange-400 text-white" : "text-black"} `}
              onClick={() => setDraft("reject")}
            >
              Reject ({2})
            </Button>
          </li>
        </ul>
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {Array.from({ length: 3 }).map((_, index) => ItemComponent())}
      </div>
    </div>
  );
};

export default DraftComponent;
