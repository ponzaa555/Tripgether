"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/src/components/UI/Button";
import { CirclePlus } from "lucide-react";

type Props = {};

const AllTripComponent = (props: Props) => {
  const [trip, setTrip] = useState("all");
  return (
    <div className="flex flex-col w-full bg-white h-[35rem] gap-5 p-3">
      <div className="flex flex-row justify-between">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <Button>
          <CirclePlus />
          Create trip plan
        </Button>
      </div>
      <nav>
        <ul className="flex justify-center gap-3 flex-wrap">
          <li>
            <Button
              variant="link"
              className={`transition duration-300 ease-in-out  ${trip === "all" ? "bg-orange-400 text-white" : "text-black"} `}
              onClick={() => setTrip("all")}
            >
              <p className="text-xs">
                All trips <br />({0})
              </p>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className={`transition duration-300 ease-in-out  ${trip === "withme" ? "bg-orange-400 text-white" : "text-black"} `}
              onClick={() => setTrip("withme")}
            >
              <p className="text-xs">
                Shared with me <br />({1})
              </p>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className={`transition duration-300 ease-in-out  ${trip === "upcoming" ? "bg-orange-400 text-white" : "text-black"} `}
              onClick={() => setTrip("upcoming")}
            >
              <p className="text-xs">
                Upcoming trip <br />({2})
              </p>
            </Button>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center items-center w-full pt-48">
        <p>There is no media to show.</p>
      </div>
    </div>
  );
};

export default AllTripComponent;
