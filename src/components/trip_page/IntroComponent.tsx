"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/UI/avatar";
import { Button } from "@/src/components/UI/Button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { IoMdTime } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { nanoid } from "nanoid";
import { CreateRoom } from "@/src/lib/backend/liveblock";





type Props = {
  userId: string | null;
  title: string;
  createAt: number;
  description?: string;
  tripId: Id<"blog">;
};

const IntroComponent = ({ userId, title, createAt, description, tripId }: Props) => {

  const getBlogMutation =  useMutation(api.blog.getById)
  const createDraftMutation =  useMutation(api.draft.create)
  const route = useRouter()
  const userData = useQuery(api.user.getUserData, { userId: userId || "" });
  const timestamp = Math.floor(createAt);
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return <div>Invalid date</div>;
  }
  const handleUseThisTrips = async () => { 
    try {
      const roomId = nanoid()
      const blog = await getBlogMutation({
        blogId: tripId,
      })
      await createDraftMutation({
        memberId : userId || "",
        blogName : blog!.blogName,
        stDate : blog!.stDate,
        endDate : blog!.endDate,
        liveBlockId : roomId,
      })
      const res = await CreateRoom(blog!.roomId , roomId)
      toast.success("use this trip success")
      route.push(`/draft/${roomId}`)
    } catch (error) {
      console.log("error", error)
    }
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
            () => handleUseThisTrips()
          }>Use this trip</Button>
      </div>
      <h2 className="text-xl font-black">Description</h2>
      <p className="hidden sm:block">{description}</p>
      <p className="sm:hidden">{description}</p>
      <Button className="sm:hidden" onClick={
        () => handleUseThisTrips()
      }>Use this trip</Button>
    </div>
  );
};

export default IntroComponent;
