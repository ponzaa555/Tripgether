"use client";

import AllTripComponent from "@/src/components/profile_page/AllTripComponent";
import DraftComponent from "@/src/components/profile_page/DraftComponent";
import MediaComponent from "@/src/components/profile_page/MediaComponent";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/UI/avatar";
import { Button } from "@/src/components/UI/Button";
import LoadingComponent from "@/src/components/UI/Loading";
import { useFetch } from "@/src/hooks/useFetch";
import { fetchProfileData } from "@/src/lib/frontend/http";
import { mapProfileData } from "@/src/lib/utils";
import { BoomBox, Loader2, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileComponent = () => {
  const router = useRouter();

  const { isFetching, error, fetchedData } = useFetch(
    fetchProfileData,
    mapProfileData({})
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <div className="bg-slate-200 w-full h-full">
      <div className="flex flex-col items-center justify-center gap-5 py-5 lg:hidden">
        <Avatar className="w-28 h-28 sm:w-36 sm:h-36">
          <AvatarImage />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="bg-orange-500 rounded-sm">
          <BoomBox color="white" />
        </div>
        {fetchedData.firstName && fetchedData.lastName && (
          <p className="font-extralight text-slate-900">
            Hello{" "}
            <span className="font-bold">
              {fetchedData.firstName} {fetchedData.lastName}
            </span>
          </p>
        )}
        <p className="font-extralight text-sm text-slate-700 sm:text-base">
          {fetchedData.email}
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
            {fetchedData.aboutMe === null ||
            fetchedData.aboutMe === undefined ||
            fetchedData.aboutMe === ""
              ? "No description"
              : fetchedData.aboutMe}
          </p>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:w-full lg:justify-center lg:gap-5 lg:py-10 lg:px-40 hidden">
        <div className="grid-rows-3 flex flex-col items-center gap-5">
          <Avatar className="w-36 h-36">
            <AvatarImage />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="bg-orange-500 rounded-sm">
            <BoomBox color="white" />
          </div>
          <p className="font-extralight text-sm text-slate-700 sm:text-base">
            {fetchedData.email}
          </p>
          <Button onClick={() => router.push("/profile/editprofile")}>
            <UserPen /> Edit profile
          </Button>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          {fetchedData.firstName && fetchedData.lastName && (
            <p className="font-extralight text-slate-900">
              Hello{" "}
              <span className="font-bold">
                {fetchedData.firstName} {fetchedData.lastName}
              </span>
            </p>
          )}
          <p className="font-extralight text-sm text-slate-400 sm:text-base">
            Trip plan <span className="text-black font-extrabold">{0} | </span>{" "}
            Followers <span className="text-black">{1} | </span>
            Following <span className="text-black">{2}</span>
          </p>
          <p className="text-left font-extralight text-sm text-slate-700 sm:text-base">
            {fetchedData.aboutMe === null ||
            fetchedData.aboutMe === undefined ||
            fetchedData.aboutMe === ""
              ? "No description"
              : fetchedData.aboutMe}
          </p>
        </div>
      </div>
      <MediaComponent />
      <DraftComponent />
      <AllTripComponent />
    </div>
  );
};

export default ProfileComponent;
