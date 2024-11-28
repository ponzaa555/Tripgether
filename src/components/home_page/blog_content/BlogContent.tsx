"use client";

import Image from "next/image";

import { TfiWorld } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { blogMockData, navToTrip } from "@/lib/frontend/data";

type Props = {};

const BlogContent = (props: Props) => {
  return (
    <div id={navToTrip.name} className="flex flex-col items-center pt-20 px-24">
      <h3 className="text-4xl font-normal py-5">Trip Enjoy The Moment</h3>
      <div className="w-full xl:px-72 lg:px-64">
        <SearchBox />
      </div>
      <div className="columns-1 pt-8 sm:columns-3 lg:columns-5">
        {blogMockData.map((data) => (
          <div key={data.id} className="break-inside-avoid mb-4">
            <Image
              src={data.image}
              alt={data.title}
              layout="responsive"
              width={100}
              height={100}
              className="shadow-sm"
            />
            <div className="flex flex-row justify-between pt-1">
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
            <h3 className="text-sm font-medium pt-1 pb-2">{data.title}</h3>
            <p className="text-xs text-gray-800">{data.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogContent;
