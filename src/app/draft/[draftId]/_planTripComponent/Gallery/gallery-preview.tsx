
"use client"

import LoadingComponent from "@/src/components/UI/Loading"
import { Album } from "@/src/models/components/Blog"
import { LiveObject } from "@liveblocks/client"
import { useMutation, useStorage } from "@liveblocks/react"
import { nanoid } from "nanoid"
import { describe } from "node:test"
import { list } from "postcss"
import { useState } from "react"





export const PreviewGallery = () => {
    const [loadingButton , setLoadingButton] = useState(false)
    const Addalbum = useMutation((
        { storage }
    ) => {
        setLoadingButton(true)
        const layers = storage.get("layers")
        const albumLayer = layers.get("Album")
        console.log({ albumLayer })
        if (albumLayer.length ===0 ) {
            // ไมม่ album
            const album1 : Album = {
                name: "Album1",
                describtion: "Food Photo",
                listUrl: [
                    "https://media.istockphoto.com/id/1807189493/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%AB%E0%B8%8D%E0%B8%B4%E0%B8%87%E0%B8%81%E0%B8%B4%E0%B8%99%E0%B8%AB%E0%B8%A1%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%9F%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%9C%E0%B9%87%E0%B8%94%E0%B8%94%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%A1%E0%B9%83%E0%B8%99%E0%B8%89%E0%B8%87%E0%B8%8A%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B8%88%E0%B8%B5%E0%B8%99.jpg?s=1024x1024&w=is&k=20&c=gjQQVh-a9jtwS4cS25HZPTGYbytwHO8f4NfB4XeqNS4=",
                    "https://media.istockphoto.com/id/1164624416/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%A1%E0%B8%B2%E0%B9%80%E0%B8%A5%E0%B9%80%E0%B8%8B%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1-hawker-%E0%B8%AB%E0%B8%A1%E0%B9%89%E0%B8%AD%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B9%84%E0%B8%81%E0%B9%88%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%AA%E0%B8%95%E0%B9%87%E0%B8%AD%E0%B8%81.jpg?s=1024x1024&w=is&k=20&c=KMVlCXhbhi7hMIgs1G-73rTtZOM2ddMpHhv6vDfZzcM=",
                    "https://media.istockphoto.com/id/1219391206/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B9%8D%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%8A%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%9F%E0%B9%84%E0%B8%AB%E0%B8%A1%E0%B9%89.jpg?s=1024x1024&w=is&k=20&c=mZPtqfBQltFmk0a_C-oPszbXS_cWStvdRefg3ZTUKh8=",
                ]
            }
            const album2 : Album = {
                name: "Album2",
                describtion: "View",
                listUrl:[
                    "https://cdn.pixabay.com/photo/2021/11/12/07/04/china-6788187_1280.jpg",
                    "https://media.istockphoto.com/id/467996872/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%95%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%A2%E0%B8%B9%E0%B8%99%E0%B9%83%E0%B8%99%E0%B8%AE%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%87.jpg?s=1024x1024&w=is&k=20&c=KL1f69bV4il9EbIMkCcGGfJniQh0Xfkyik27QZ802kc=",
                    "https://cdn.pixabay.com/photo/2023/01/10/00/17/italy-7708552_1280.jpg",
                ]
            }
            layers.set("Album", [album1 , album2])
        } else {
            layers.set("Album", [])
        }
        setLoadingButton(true)
    }, [])
    const layer = useStorage((root) => root.layers)
    if (!layer) {
        return (
            <div>
                <LoadingComponent />
            </div>
        )
    }
    const albumLayer = layer.get("Album")
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
                        <div className="flex py-4 px-6 gap-6 mt-4"><div className="w-[70px] flex shrink-0 items-start">
                            <img src="/uoload-Image.webp" alt="booking" className="object-contain w-full" />
                        </div>
                            <div className="grow flex items-center justify-between gap-x-10 mobile:flex-col mobile:items-start gap-y-4">
                                {albumLayer ? (
                                    <div className="grow flex flex-col gap-1">
                                        <h4>Let's collect your memory here.</h4>
                                        <p className="text-[#8D919D] text-xs">You can create a photo album related to this trip.</p>
                                    </div>) : (
                                    <div>
                                        {/* {albumLayer.map(())} */}
                                    </div>

                                )}
                                <button id="step10-add_album" className="bg-[#F79552] flex gap-2 items-center py-2 px-4 whitespace-nowrap text-white text-sm leading-normal rounded-md"
                                    disabled = {false}
                                    onClick={() => Addalbum()}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-plus" className="svg-inline--fa fa-circle-plus text-white text-sm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                                    </svg>
                                    Add album
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}