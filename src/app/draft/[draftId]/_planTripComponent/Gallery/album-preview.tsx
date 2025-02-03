"use client"

import { Album } from "@/src/models/components/Blog"
import { useMutation } from "@liveblocks/react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/UI/accordion"
import { MoreAction } from "../more-action"
import { Ellipsis, EllipsisVertical } from "lucide-react"
import { Button, type GetProp, type UploadFile, type UploadProps } from 'antd';
import { useState } from "react"
import { UploadChangeParam } from "antd/es/upload"
import { UploadCloundinary } from "@/src/lib/backend/uploadCloundinary"
import { PlusOutlined } from '@ant-design/icons';
import UploadAddNotePhoto from "../upload-addnote-photo"
import { late } from "zod"
import UploadAlbumImage from "./upload-Image-album"



interface AlbumPreviewProps {
    album: Album
    index: number
}

export const AlbumPreview = ({ album, index }: AlbumPreviewProps) => {
    

    

    const updateInput = useMutation((
        { storage },
        newValue: string | number,
        key : string
    ) => {
        const layers = storage.get("layers")
        const albumLayer = layers.get("Album")
        const listAlbum = albumLayer?.get("albumList")
        const album = listAlbum[index]


        album[key] = newValue

        albumLayer?.set("albumList" , listAlbum)
    }, [])

    const deletAlbum = useMutation((
        {storage},

    ) => {
        const layes = storage.get("layers")
        const albumLayer = layes.get("Album")
        let listAlbum = albumLayer?.get("albumList")

        console.log(listAlbum)
         listAlbum = listAlbum.filter((e,i) => i !== index)

        albumLayer?.set("albumList" , listAlbum)
    },[])
    return (
        
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <div className=" flex gap-x-3">
                        <AccordionTrigger>
                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ExpandMoreIcon">
                                <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                            </svg>
                        </AccordionTrigger>
                        <div className=" flex items-center w-full ">
                            <input className=" w-full  bg-transparent hover:border-slate-200 hover:bg-[#F4F8FB] hover:border text-sm
                          placeholder:text-slate-300 py-2 px-2 rounded-md outline-none"
                                placeholder="Album1"
                                value={album.name}
                                type="text"
                                onChange={(e) => updateInput(e.target.value , "name")}
                            />
                            <MoreAction lable="Delte album" deleteHandle={deletAlbum}  index={index} typeAction="album" />
                        </div>
                    </div>
                    <AccordionContent className=" space-y-4">
                       <UploadAlbumImage listImage={album.listUrl} index={index}/>
                       <textarea  className=" w-full  bg-transparent hover:border-slate-200 hover:bg-[#F4F8FB] hover:border text-sm
                          placeholder:text-slate-300 py-2 px-2 rounded-md outline-none"
                                placeholder="Add description"
                                value={album.describtion}
                                onChange={(e) => updateInput(e.target.value , "describtion")}
                            />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}