"use client"

import { api } from "@/convex/_generated/api"
import LoadingComponent from "@/src/components/UI/Loading"
import { UploadImgDialog } from "@/src/components/uploadImageDialog"
import { UploadCloundinary, UploadCloundinaryCover } from "@/src/lib/backend/uploadCloundinary"
import { useMutation as useLiveblocksMutation, useStorage, useUpdateMyPresence } from "@liveblocks/react"
import { useMutation } from "convex/react"
import { Camera } from "lucide-react"
import Image from "next/image"
import React, { useCallback, useState } from "react"
import { Selections } from "./Selection"

interface CoverImageProps {
    imgUrl: string
    blogId: string
}

export const CoverImage = ({
    blogId,
}: CoverImageProps) => {

    const updateMyPresence = useUpdateMyPresence();

    const mutation = useMutation(api.blog.getById)
    const [uploadImgDialog, setUploadImgDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleUploadPhoto = useLiveblocksMutation(async (
        { storage },
        file: File,
        blogId: string
    ) => {
        setUploadImgDialog(false)
        setLoading(true);
        const urlImg = await UploadCloundinaryCover(file, blogId)
        const layer = storage.get("layers")
        const coverImg = await layer.get("CoverImg")?.set("imgUrl", urlImg);
        setLoading(false)
    }, [])


    const CoverImglayer = useStorage((storage) => storage.layers.get("CoverImg"));
    if (!CoverImglayer) {
        return (
            <div className="flex justify-cente items-center w-full max-h-[200px] overflow-hidden relative bg- white cover">
                <LoadingComponent />
            </div>
        )
    }
    const imgUrl = CoverImglayer["imgUrl"] as string
    return (
        <>
            {
                !loading ? (
                    <div className=" relative">
                        <div className="flex justify-center w-full min-h-[400px] max-h-[1000px]  overflow-hidden bg- white cover p-1 relative"
                        // onFocus={(e) => {
                        //     console.log(e.target.id)
                        //     updateMyPresence({ focusedId: e.target.id })
                        // }}
                        // id="TripCover" 
                        >
                            < img draggable="false" src={imgUrl ? imgUrl : "/tea.webp"} className="absolute top-1/2 -translate-y-1/2 w-full  object-cover blur-lg" />
                            <Image alt="" src={imgUrl ? imgUrl : "/tea.webp"} className=" object-contain z-[1] items-center px-0 " width={300} height={300} />
                            <button className=" flex absolute bg-white rounded-md bottom-2 right-4 px-4 items-center justify-center gap-x-2 py-1 "
                                onFocus={(e) => {
                                    console.log(e.target.id)
                                    updateMyPresence({ focusedId: e.target.id })
                                }}
                                onClick={() => setUploadImgDialog(true)}
                                id="TripCover">
                                <Camera color="black" strokeWidth={1} stroke="#ffffff" fill="#000" size={20} />
                                <span className=" text-sm font-sans">Edit Cover</span>
                            </button>
                            <UploadImgDialog isOpen={uploadImgDialog} setIsOpen={setUploadImgDialog} blogId={blogId} handleUploadPhoto={handleUploadPhoto} />
                        </div >
                        <Selections id="TripCover" coverImg = {true} />
                    </div>
                ) : (
                    <div className="flex justify-cente items-center w-full max-h-[400px] overflow-hidden relative bg- white cover">
                        <LoadingComponent />
                    </div>
                )

            }
        </>

    )
}