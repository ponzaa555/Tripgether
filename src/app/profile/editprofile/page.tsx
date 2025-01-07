"use client";
import IdentityForm from "@/src/components/editprofile_page/IdentityForm";
import { Avatar, AvatarImage } from "@/src/components/UI/avatar";
import { Button } from "@/src/components/UI/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/UI/dialog";
import LoadingComponent from "@/src/components/UI/Loading";
import { useFetch } from "@/src/hooks/useFetch";
import { fetchProfileData } from "@/src/lib/frontend/http";
import { mapProfileData } from "@/src/lib/utils";
import { ImageUp, Loader2, UserRound } from "lucide-react";
import { useRef, useState } from "react";

export default function EditProfile() {
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
        <IdentityForm {...fetchedData} />
      </div>
    </div>
  );
}
