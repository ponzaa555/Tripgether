"use client";

import Image from "next/image";

import { TfiWorld } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";
import { blogMockData } from "@/lib/frontend/data";

type Props = {};

const BlogContent = (props: Props) => {
  return (
    <div className="flex flex-col items-center pt-20 px-12">
      <h3 className="text-3xl sm:text-5xl md:text-6xl font-black">
        Enjoy The Moment
      </h3>
      <div className="columns-1 pt-8 sm:columns-3 lg:columns-5 w-full">
        {blogMockData.map((data) => (
          <div
            key={data.id}
            className="break-inside-avoid flex flex-col gap-1 pb-10"
          >
            <Image
              src={data.image}
              alt={data.title}
              width={1000}
              height={1000}
              className="shadow-sm w-full h-full"
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
