import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import axios from "axios";
import { useMutation } from "convex/react";
import { nanoid } from "nanoid";

export const UploadCloundinaryCover = async (file: File, blogId: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Tripgather");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dhinefvf8/image/upload",
      {
        method: "post",
        body: formData,
      }
    );
    const image = await response.json();
    const res = await fetchMutation(api.blog.upSetImageCover, {
      blogId: blogId as Id<"Blog">,
      imgUrl: image.secure_url,
    });
    return image.secure_url;
  } catch (error) {
    console.log({ error });
  }
  return;
};

export const UploadCloundinary = async (file: File , uid?:string) => {
  try {
    const id = nanoid();
    const formData = new FormData();
    formData.append("file", file);
    //Add note Photo
    if(uid) {
      formData.append("public_id", uid);
    }else{
      formData.append("public_id", id);
    }
    formData.append("upload_preset", "Tripgather");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dhinefvf8/image/upload",
      {
        method: "post",
        body: formData,
      }
    );
    const images = await response.json();
    console.log({ images });
    return { url: images.secure_url, id: images.public_id };
  } catch (error) {
    console.log({ error });
  }
};
