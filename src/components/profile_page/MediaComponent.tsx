"use client";
import React, { useState } from "react";
import { Button } from "@/src/components/UI/Button";
import { Images, LibraryBig, Video } from "lucide-react";

const MediaComponent = () => {
  const [media, setMedia] = useState("photos");
  return (
    <div className="bg-white w-full h-80 p-5 py-10 flex flex-col gap-5 sm:h-96 sm:gap-7 lg:h-[30rem]">
      <p className="flex justify-center sm:text-4xl font-black">
        All Media ({1})
      </p>
      <nav>
        <ul className="flex justify-center gap-5">
          <li>
            <Button
              variant="link"
              className={`transition duration-300 ease-in-out  ${media === "photos" ? "bg-orange-400 text-white" : "text-black"} `}
              onClick={() => setMedia("photos")}
            >
              <Images />
              Photos
              <br />({1})
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className={`transition duration-300 ease-in-out  ${media === "Video" ? "bg-orange-400 text-white" : "text-black"} `}
              onClick={() => setMedia("Video")}
            >
              <Video />
              Video
              <br />({2})
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className={`transition duration-300 ease-in-out  ${media === "Albums" ? "bg-orange-400 text-white" : "text-black"} `}
              onClick={() => setMedia("Albums")}
            >
              <LibraryBig />
              Albums
              <br />({3})
            </Button>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center items-center w-full h-full sm:text-lg">
        There is no media to show.
      </div>
    </div>
  );
};

export default MediaComponent;
