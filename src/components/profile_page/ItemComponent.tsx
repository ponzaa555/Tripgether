import Image from "next/image";
import React from "react";
import { Button } from "@/src/components/UI/Button";
import { Pencil } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

type ItemComponentProps = {
  _id: Id<"draft">;
  _creationTime: number;
  coverImgUrl?: string | undefined;
  memberId: Id<"users">;
  blogName: string;
  stDate: string;
  endDate: string;
  liveBlockId: string;
};
const ItemComponent = ({
  _id,
  _creationTime,
  coverImgUrl,
  memberId,
  blogName,
  stDate,
  endDate,
  liveBlockId,
}: ItemComponentProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-row w-full justify-between border-2 border-slate-400 bg-white rounded-md border-dotted">
      <div className="flex flex-row gap-1 p-2 w-full">
        <div className="w-20 h-20">
          <Image
            src={
              coverImgUrl ||
              "https://www.gethergo.com/images/go-trip/bg-cover.png"
            }
            alt="darftImage"
            width={100}
            height={100}
            className="object-fill w-full h-full rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm truncate">{blogName}</p>
          <p className="text-xs truncate text-slate-500">Start Date:</p>
          <p className="text-xs truncate text-slate-500">{stDate}</p>
          <p className="text-xs truncate text-slate-500">End Date:</p>
          <p className="text-xs truncate text-slate-500">{endDate}</p>
        </div>
      </div>
      <div className="flex self-center p-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(`/draft/${liveBlockId}`)}
        >
          <Pencil />
        </Button>
      </div>
    </div>
  );
};

export default ItemComponent;
