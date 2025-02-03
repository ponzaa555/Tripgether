"use client";

import { Calendar, MenuIcon, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavInput } from "./nav-input";
import { Button } from "@/src/components/UI/Button";
import { Hint } from "@/src/components/hint";
import { calDateDuration } from "@/src/lib/utils";
import { LiveblocksProvider } from "@liveblocks/react";
import { GetRoomStorage, PostRoomStorageMongo } from "@/src/lib/backend/liveblock";
import { toast } from "sonner";
import { useState } from "react";
import { useMutationState } from "@/src/hooks/useMutation";
import { api } from "@/convex/_generated/api";

interface NavbarProps {
  blogName: string;
  startDate: string;
  endDate: string;
  blogId : string,
  authorId : string
}

export const Navbar = ({ blogName, startDate, endDate , blogId , authorId }: NavbarProps) => {
  const [isLoading , setIsLoading] = useState(false)
  const duration = calDateDuration(startDate,endDate);
  const { mutate, pending } = useMutationState(api.blog.create)

  const handlePostBlog = async( blogId : string) => {
    setIsLoading(true)
    console.log({
      blogName,
      authorId,
    })
    try{
    const  room = await GetRoomStorage( blogId)
    mutate({
      blogName : blogName,
      authorId : authorId,
      stDate : startDate,
      endDate : endDate,
      roomId :  blogId
    })
    const response = await PostRoomStorageMongo(blogId , room.storage.data)
    if(response.status === 200){
      toast.success("Post sucesss")
    }
    console.log({response})
  }catch(error){
    console.log(error)
    toast.error("Faild to Post Blog")
  }
    setIsLoading(false)
  }
  
  return (
    <nav className="flex w-full top-0 fixed bg-white z-[51] min-h-[60px] shadow-xl items-center ">
      <div className="flex flex-col sm:flex-row justify-between items-center h-full w-full px-6 2xl:px-16 gap-3">
        {/* Left Section */}
        <div className="flex items-center w-full sm:w-1/2 gap-5">
          <MenuIcon />
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={105}
              height={60}
              className="cursor-pointer w-full h-full pt-2"
            />
          </Link>
          <NavInput tripName={blogName} />
        </div>

        {/* Right Section */}
        <div className="flex  sm:flex-row justify-between items-center w-full sm:w-1/2 sm:pl-6 gap-3">
          {/* Date and Calendar Section */}
          <div className="flex flex-row sm:flex-row items-center gap-3">
            <div className="flex flex-col items-center">
              <p className="text-xs text-go-gray">Days</p>
              <p>{duration}</p>
            </div>
            <div className="flex items-center gap-4">
              <span>
                <Calendar />
              </span>
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-xs text-go-gray">Start date</p>
                <p className="text-sm font-semibold text-go-dark">
                  {startDate} - {endDate}
                </p>
              </div>
            </div>
          </div>

          {/* Post Button and More Options */}
          <div className="flex items-center gap-3">
            <Button size="default" className="m-2"
              onClick={() => handlePostBlog(blogId)}
              disabled ={isLoading}>
              Post
            </Button>
            <Hint label="More" side="bottom" sideOffset={3}>
              <MoreVertical />
            </Hint>
          </div>
        </div>
      </div>
    </nav>
  );
};
