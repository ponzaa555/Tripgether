import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/UI/avatar";
import { IoMdTime } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { Button } from "@/src/components/UI/Button";

const IntroComponent = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://cdn.pixabay.com/photo/2024/01/31/12/16/ai-generated-8544012_1280.jpg" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-lg font-black">{"Trip ท่องเที่ยวทั่วไทย"}</h1>
            <p className="text-base font-thin text-slate-500">{"username"}</p>
            <div className="flex flex-row justify-center items-center gap-2">
              <IoMdTime color="gray" />
              <p className="text-xs font-thin text-slate-500 ">
                Created {"25 Aug, 2023"} -
              </p>
              <BiWorld color="gray" />
              <p className="text-xs font-thin text-slate-500">{200} views</p>
            </div>
          </div>
        </div>
        <Button className="hidden sm:block">Use this trip</Button>
      </div>
      <Button className="sm:hidden">Use this trip</Button>
    </div>
  );
};

export default IntroComponent;
