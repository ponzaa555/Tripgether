"use client";
import IdentityForm from "@/src/components/profile_page/IdentityForm";
import { Avatar, AvatarImage } from "@/src/components/UI/avatar";
import { Button } from "@/src/components/UI/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/UI/dialog";
import { ImageUp, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type EditProfileProps = {};

export default function EditProfile({}: EditProfileProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);



  const handleImageUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file);
      setImage(file);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center pt-10 px-10 mb-4">
      <h1 className="text-xl font-extrabold self-start py-4">
        Account settings
      </h1>
      <div className="w-full h-full flex flex-col p-4 border-2 border-gray-300 rounded-lg">
        <h2 className="font-extrabold text-xl">Profile</h2>
        <div className="flex justify-center py-4">
          {image ? (
            <Avatar className="cursor-pointer w-28 h-28">
              <AvatarImage src={URL.createObjectURL(image)} />
            </Avatar>
          ) : (
            <UserRound color="orange" size={100} />
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="self-center w-44">Change profile picture</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col">
            <DialogHeader>Chose your Profile Image</DialogHeader>
            <div className="flex justify-center items-center w-full h-full">
              {image ? (
                <Avatar className="cursor-pointer w-28 h-28">
                  <AvatarImage
                    src={URL.createObjectURL(image)}
                    onClick={handleImageUpload}
                    style={{ objectFit: "cover" }}
                  />
                </Avatar>
              ) : (
                <ImageUp
                  color="orange"
                  size={100}
                  className="cursor-pointer"
                  onClick={handleImageUpload}
                />
              )}
            </div>
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              accept="image/*"
            />
            <DialogTitle className="self-center">
              Click the image for choose a photo
            </DialogTitle>
          </DialogContent>
        </Dialog>
        <IdentityForm />
      </div>
    </div>
  );
}
