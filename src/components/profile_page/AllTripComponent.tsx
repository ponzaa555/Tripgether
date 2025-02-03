"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { TfiWorld } from "react-icons/tfi";

const AllTripComponent = ({ userId }: any) => {
  const blogs = useQuery(api.blog.getBlogsbyUserId, { authorId: userId });
  const userData = useQuery(api.user.getUserData, { userId: userId });
  const router = useRouter();
  return (
    <div className="flex flex-col w-full bg-white h-[35rem] gap-5 p-3">
      <div className="flex flex-row justify-between">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </div>
      <h3 className="flex justify-center sm:text-4xl font-black">
        Trip plan ({0})
      </h3>

      {blogs?.length === 0 ? (
        <div className="flex justify-center items-center w-full pt-48">
          <p>There is no media to show.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center px-3">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full px-10">
            {blogs?.map((data) => (
              <div
                key={data._id}
                className="break-inside-avoid flex flex-col gap-1 pb-10 cursor-pointer"
                onClick={() => router.push(`/trip/${data._id}`)}
              >
                <div className="relative w-full h-0 pb-[100%]">
                  <Image
                    src={
                      data.coverImgUrl ??
                      "https://www.huber-online.com/daisy_website_files/product_img/no-image.jpg"
                    }
                    alt={data.blogName}
                    layout="fill"
                    objectFit="cover"
                    className="shadow-sm rounded-lg hover:scale-105 transform transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="flex font-light text-xs text-gray-400 items-baseline gap-1">
                    {format(
                      new Date(data._creationTime),
                      "d MMM, yy 'at' h:mm a"
                    )}
                    <span>
                      <TfiWorld />
                    </span>
                  </p>
                </div>
                <h3 className="text-sm font-black">{data.blogName}</h3>
                <p className="text-xs text-gray-800">{userData?.username}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTripComponent;
