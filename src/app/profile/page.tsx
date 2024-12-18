"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/UI/avatar";
import { Button } from "@/src/components/UI/Button";
import {
  BoomBox,
  CirclePlus,
  Images,
  LibraryBig,
  Pencil,
  UserPen,
  Video,
} from "lucide-react";
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
      <div className="flex flex-col items-center justify-center gap-5 py-5 lg:hidden">
        <Avatar className="w-28 h-28 sm:w-36 sm:h-36">
          <AvatarImage />
          <AvatarFallback>111</AvatarFallback>
        </Avatar>
        <div className="bg-orange-500 rounded-sm">
          <BoomBox color="white" />
        </div>
        <p className="font-extralight text-sm text-slate-700 sm:text-base">
          test@gmail.com
        </p>
        <Button onClick={() => router.push("/profile/editprofile")}>
          <UserPen /> Edit profile
        </Button>
        <p className="font-extralight text-sm text-slate-400 sm:text-base">
          Trip plan <span className="text-black font-extrabold">{0} | </span>{" "}
          Followers <span className="text-black">{1} | </span>
          Following <span className="text-black">{2}</span>
        </p>
        <div className="w-80">
          <p className="text-center font-extralight text-sm text-slate-700 sm:text-base">
            Hi my name is {"username"} and I am a traveler. I love to explore
            new places and meet new people. I am a travel blogger and I am
            passionate
          </p>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:w-full lg:justify-center lg:gap-5 lg:py-10 lg:px-40 hidden">
        <div className="grid-rows-3 flex flex-col items-center gap-5">
          <Avatar className="w-36 h-36">
            <AvatarImage />
            <AvatarFallback>111</AvatarFallback>
          </Avatar>
          <div className="bg-orange-500 rounded-sm">
            <BoomBox color="white" />
          </div>
          <p className="font-extralight text-sm text-slate-700 sm:text-base">
            test@gmail.com
          </p>
          <Button onClick={() => router.push("/profile/editprofile")}>
            <UserPen /> Edit profile
          </Button>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <p className="font-extralight text-sm text-slate-400 sm:text-base">
            Trip plan <span className="text-black font-extrabold">{0} | </span>{" "}
            Followers <span className="text-black">{1} | </span>
            Following <span className="text-black">{2}</span>
          </p>
          <p className="text-left font-extralight text-sm text-slate-700 sm:text-base">
            Hi my name is {"username"} and I am a traveler. I love to explore
            new places and meet new people. I am a travel blogger and I am
            passionate
          </p>
        </div>
      </div>
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
      <div className="h-auto p-5 pt-20 flex flex-col gap-5">
        <p className="flex justify-center font-black sm:text-2xl">
          My draft trip ({1})
        </p>
        <nav>
          <ul className="flex justify-center gap-5">
            <li>
              <Button
                variant="link"
                className={`transition duration-300 ease-in-out  ${draft === "draft" ? "bg-orange-400 text-white" : "text-black"} `}
                onClick={() => setDraft("draft")}
              >
                Draft ({1})
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className={`transition duration-300 ease-in-out  ${draft === "reject" ? "bg-orange-400 text-white" : "text-black"} `}
                onClick={() => setDraft("reject")}
              >
                Reject ({2})
              </Button>
            </li>
          </ul>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          <div className="flex flex-row w-full justify-between border-2 border-slate-400 bg-white rounded-md border-dotted">
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
                <p className="text-xs truncate text-slate-500">
                  {"15 Nov 2024"}
                </p>
              </div>
            </div>
            <div className="flex self-center p-2">
              <Button variant="outline" size="icon">
                <Pencil />
              </Button>
            </div>
          </div>
          <div className="flex flex-row w-full justify-between border-2 border-slate-400 bg-white rounded-md border-dotted">
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
                <p className="text-xs truncate text-slate-500">
                  {"15 Nov 2024"}
                </p>
              </div>
            </div>
            <div className="flex self-center p-2">
              <Button variant="outline" size="icon">
                <Pencil />
              </Button>
            </div>
          </div>
          <div className="flex flex-row w-full justify-between border-2 border-slate-400 bg-white rounded-md border-dotted">
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
                <p className="text-xs truncate text-slate-500">
                  {"15 Nov 2024"}
                </p>
              </div>
            </div>
            <div className="flex self-center p-2">
              <Button variant="outline" size="icon">
                <Pencil />
              </Button>
            </div>
          </div>
        </div>
      </div>

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
