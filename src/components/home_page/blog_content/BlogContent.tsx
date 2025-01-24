"use client";

import Image from "next/image";

import { TfiWorld } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";
import { blogMockData } from "@/src/lib/frontend/data";
import { useRouter } from "next/navigation";

const BlogContent = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center px-12">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 w-full px-10">
        {blogMockData.map((data) => (
          <div
            key={data.id}
            className="break-inside-avoid flex flex-col gap-1 pb-10"
            onClick={() => router.push(`/trip/${data.id}`)}
          >
            <Image
              src={data.image}
              alt={data.title}
              width={1000}
              height={1000}
              className="shadow-sm w-full rounded-lg hover:scale-105 transform transition-transform duration-300 h-full"
            />
            <div className="flex flex-row justify-between">
              <p className="flex font-light text-xs text-gray-400 items-baseline gap-1">
                3 Aug, 23 at 2:31 PM.
                <span>
                  <TfiWorld />
                </span>
              </p>
              <p className="flex font-light text-xs text-gray-400 items-center gap-1">
                <span>
                  <FaEye />
                </span>
                20
              </p>
            </div>
            <h3 className="text-sm font-black">{data.title}</h3>
            <p className="text-xs text-gray-800">{data.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogContent;
