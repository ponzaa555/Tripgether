
"use client"

import LoadingComponent from "@/src/components/UI/Loading"
import { LiveObject } from "@liveblocks/client"
import { useMutation, useStorage } from "@liveblocks/react"
import { nanoid } from "nanoid"
import { describe } from "node:test"
import { list } from "postcss"





export const PreviewGallery = () => {

    const Addalbum = useMutation((
        { storage }
    ) => {
        const layers = storage.get("layers")
        const albumLayer = layers.get("Album")
        console.log({albumLayer})
        if (albumLayer === undefined) {
            // ไมม่ album
            const album = new LiveObject({
                name: "",
                describe: "",
                list: []
            })
            layers.set("Album", [album])
        }
    }, [])
    const layer = useStorage((root) => root.layers)
    if(!layer){
        return(
        <div>
            <LoadingComponent/>
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