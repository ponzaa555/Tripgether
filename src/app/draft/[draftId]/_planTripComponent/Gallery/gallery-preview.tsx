
"use client"

import LoadingComponent from "@/src/components/UI/Loading"
import { Album } from "@/src/models/components/Blog"
import { LiveObject } from "@liveblocks/client"
import { useMutation, useStorage } from "@liveblocks/react"
import { nanoid } from "nanoid"
import { describe } from "node:test"
import { list } from "postcss"
import { useState } from "react"
import { AlbumPreview } from "./album-preview"
import { PlusCircle } from "lucide-react"





export const PreviewGallery = () => {
    const [loadingButton, setLoadingButton] = useState(false)

    const Addalbum = useMutation((
        { storage }
    ) => {
        setLoadingButton(true)
        const layers = storage.get("layers")
        const albumLayer = layers.get("Album")
        const newAlbum: Album = {
            name: "",
            describtion: "",
            listUrl: [
            ]
        }
        if (albumLayer.length === 0) {
            // ไมม่ album
            layers.set("Album", [newAlbum])
        } else {
            layers.set("Album", [...albumLayer, newAlbum])
        }
        setLoadingButton(true)
    }, [])
    const layers = useStorage((root) => root.layers)
    if (!layers) {
        return (
            <div>
                <LoadingComponent />
            </div>
        )
    }
    const albumLayer = layers.get("Album")["albumList"]
    console.log({ albumLayer })
    return (
        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 py-10 mobile:px-4 tablet:px-10 px-[5.7rem] rounded-none css-4e39zc">
            <div className="MuiGrid-root css-rfnosa">
                <div className="MuiGrid-root w-full css-rfnosa">
                    <div className="flex gap-2 items-center">
                        <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium self-start css-9lpudm" type="button">
                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ExpandMoreIcon">
                                <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                            </svg>
                            <span className="MuiTouchRipple-root css-w0pj6f"></span>
                        </button>
                        <h3>My Gallery</h3>
                    </div>
                </div>
            </div>
            <div className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr"
                style={{
                    height: `min-height: 0px; height: auto; transition-duration: 300ms`
                }}
            >
                <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                    <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                        <div className="grow  items-center justify-between gap-x-10 mobile:flex-col mobile:items-start gap-y-4">
                            {albumLayer?.length === 0 ? (
                                <div className=" flex items-center justify-between w-full">
                                        <div className="flex py-4 px-6 gap-6 mt-4"><div className="w-[70px] flex shrink-0 items-start">
                                            <img src="/uoload-Image.webp" alt="booking" className="object-contain w-full" />
                                        </div></div>
                                    <div className="grow flex flex-col gap-1 ">
                                        <h4>Let's collect your memory here.</h4>
                                        <p className="text-[#8D919D] text-xs">You can create a photo album related to this trip.</p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {/* {albumLayer.map(())} */}
                                    {albumLayer?.map((element, index) => {
                                        return (
                                            <AlbumPreview album={element} index={index} key={index}/>
                                        )
                                    })}
                                </div>

                            )}
                            <button id="step10-add_album" className="bg-[#F79552] flex gap-2 items-center py-2 px-4 whitespace-nowrap text-white text-sm leading-normal rounded-md
                              "
                                disabled={false}
                                onClick={() => Addalbum()}>
                                <PlusCircle size={15} fill="#fff" color="#F79552"/>
                                <p className="font-extralight">Add album</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}