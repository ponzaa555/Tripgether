"use client"

import { UploadImgDialog } from "@/src/components/uploadImageDialog"
import { Camera } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface CoverImageProps {
    imgUrl? : string
    blogId : string
}

export const CoverImage = ({
    imgUrl,
    blogId
}:CoverImageProps) => {
    
    const [uploadImgDialog, setUploadImgDialog] = useState(false)
    return(
    <div className="flex justify-center w-full min-h-[400px] max-h-[1000px]  overflow-hidden relative 
    bg-white cover">
        <img draggable = "false"   src={imgUrl ? imgUrl : "/tea.webp"} className="absolute top-1/2 -translate-y-1/2 w-full  object-cover blur-lg" />
        <Image alt="" src={imgUrl ? imgUrl : "/tea.webp"} className=" object-contain z-[1] items-center px-0 " width={300} height={300}/>
        <button className=" flex absolute bg-white rounded-md bottom-2 right-4 px-4 items-center justify-center gap-x-2 py-1 "  
            onClick={() => setUploadImgDialog(true)}>
            <Camera color="black" strokeWidth={1}  stroke="#ffffff" fill="#000" size={20} />
            <span className=" text-sm font-sans">Edit Cover</span>
        </button>
        <UploadImgDialog isOpen={uploadImgDialog} setIsOpen={setUploadImgDialog} blogId={blogId} />
    </div>
    ) 
}