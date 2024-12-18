"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BoomBox, CirclePlus, Images, Pencil, UserPen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const [media, setMedia] = useState("photos");
  const [draft, setDraft] = useState("draft");
  const [trip, setTrip] = useState("all");
  const router = useRouter();
  return (
    <div className="bg-slate-200 w-full h-full">
      <div className="flex flex-col items-center p-5 gap-3">
        <Avatar className="w-28 h-28">
          <AvatarImage />
          <AvatarFallback>111</AvatarFallback>
        </Avatar>
        <div className="bg-orange-500 rounded-sm">
          <BoomBox color="white" />
        </div>
        <p className="font-extralight text-sm text-slate-700">test@gmail.com</p>
        <Button onClick={() => router.push("/profile/editprofile")}>
          <UserPen /> Edit profile
        </Button>
        <p className="font-extralight text-sm text-slate-400">
          Trip plan <span className="text-black">{0} | </span> Followers{" "}
          <span className="text-black">{1} | </span>
          Following <span className="text-black">{2}</span>
        </p>
        <p className="text-center font-extralight text-sm text-slate-700">
          Hi my name is {"username"} and I am a traveler. I love to explore new
          places and meet new people. I am a travel blogger and I am passionate
        </p>
      </div>
      <div className="bg-white w-full h-80 p-5 flex flex-col gap-5">
        <p className="flex justify-center">All Media</p>
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
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className={`transition duration-300 ease-in-out  ${media === "Video" ? "bg-orange-400 text-white" : "text-black"} `}
                onClick={() => setMedia("Video")}
              >
                <Images />
                Video
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className={`transition duration-300 ease-in-out  ${media === "Albums" ? "bg-orange-400 text-white" : "text-black"} `}
                onClick={() => setMedia("Albums")}
              >
                <Images />
                Albums
              </Button>
            </li>
          </ul>
        </nav>
        <div className="flex justify-center items-center w-full h-full">
          There is no media to show.
        </div>
      </div>
      <div className="h-80 p-5 pt-20 flex flex-col items-center gap-5">
        <p className="font-extrabold">My draft trip ({1})</p>
        <nav>
          <ul className="flex justify-center gap-5">
            <li>
              <Button
                variant="link"
                className={`transition duration-300 ease-in-out  ${draft === "draft" ? "bg-orange-400 text-white" : "text-black"} `}
                onClick={() => setDraft("draft")}
              >
                Draft
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className={`transition duration-300 ease-in-out  ${draft === "reject" ? "bg-orange-400 text-white" : "text-black"} `}
                onClick={() => setDraft("reject")}
              >
                Reject
              </Button>
            </li>
          </ul>
        </nav>
        <div className="border-2 border-slate-400 bg-white rounded-md border-dotted flex flex-row w-full justify-between">
          <div className="flex flex-row gap-1 p-2 w-full">
            <div className="w-20 h-20">
              <Image
                src="https://www.gethergo.com/images/go-trip/bg-cover.png"
                alt="darftImage"
                width={100}
                height={100}
                className="object-fill w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm truncate">{"Trip in Thailand"}</p>
              <p className="text-xs truncate text-slate-500">{"15 Nov 2024"}</p>
            </div>
          </div>
          <div className="flex self-center p-2">
            <Button variant="outline" size="icon">
              <Pencil />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full bg-white gap-5 p-3">
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
        <div className="flex h-80 justify-center items-center w-full ">
          There is no media to show.
        </div>
      </div>
    </div>
  );
};

export default Profile;
