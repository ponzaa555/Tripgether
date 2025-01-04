"use client";

import { Card } from "@/src/components/UI/card";
import { useConversation } from "@/src/hooks/useConversation";
import { cn } from "@/src/lib/utils";
import { ItemListProps } from "@/src/models/chat/conversation";

const ItemList = ({ children, title, action: Action }: ItemListProps) => {
  const { isActive } = useConversation();
  return (
    <Card
      className={cn("hidden w-full h-full lg:flex-none lg:w-80 p-2", {
        block: !isActive,
        "lg:block": isActive,
      })}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="w-full h-full flex flex-col items-center justify-start gap-2">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
