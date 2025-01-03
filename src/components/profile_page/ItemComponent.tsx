import Image from "next/image";
import React from "react";
import { Button } from "@/src/components/UI/Button";
import { Pencil } from "lucide-react";

const ItemComponent = () => {
  return (
    <div className="flex flex-row w-full justify-between border-2 border-slate-400 bg-white rounded-md border-dotted">
      <div className="flex flex-row gap-1 p-2 w-full">
        <div className="w-20 h-20">
          <Image
            src="https://www.gethergo.com/images/go-trip/bg-cover.png"
            alt="darftImage"
            width={100}
            height={100}
            className="object-fill w-full h-full rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm truncate">{"Trip in Thailand"}</p>
          <p className="text-xs truncate text-slate-500">{"15 Nov 2024"}</p>
        </div>
      </div>
      <div className="flex self-center p-2">
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </div>
    </div>
  );
};

export default ItemComponent;
