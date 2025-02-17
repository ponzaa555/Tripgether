"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/UI/avatar";
import { Button } from "@/src/components/UI/Button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { IoMdTime } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { format } from "date-fns";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { CopyRoom } from "@/src/lib/backend/liveblock";
import { useRouter } from "next/navigation";


type Props = {
  userId: string | null;
  title: string;
  createAt: number;
  description?: string;
};

const IntroComponent = ({ userId, title, createAt, description }: Props) => {

  const route = useRouter()
  const userData = useQuery(api.user.getUserData, { userId: userId || "" });
  const timestamp = Math.floor(createAt);
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return <div>Invalid date</div>;
  }

  const formattedDate = format(date, "d MMM yyyy");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src={userData?.imageUrl} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-lg font-black">{title}</h1>
            <p className="text-base font-thin text-slate-500">
              {userData?.username}
            </p>
            <div className="flex flex-row justify-center items-center gap-2">
              <IoMdTime color="gray" />
              <p className="text-xs font-thin text-slate-500 ">
                Created {formattedDate} -
              </p>
              <BiWorld color="gray" />
            </div>
          </div>
        </div>
        <Button className="hidden sm:block"
        onClick={
          () => route.push("/draft/a2Cxk4uJWQXpOOfRyWssL")
        }>Use this trip</Button>
      </div>
      <h2 className="text-xl font-black">Description</h2>
      <p className="hidden sm:block">{description}</p>
      <p className="sm:hidden">{description}</p>
      <Button className="sm:hidden" onClick={
        () => route.push("/draft/a2Cxk4uJWQXpOOfRyWssL")
      }>Use this trip</Button>
    </div>
  );
};

export default IntroComponent;
