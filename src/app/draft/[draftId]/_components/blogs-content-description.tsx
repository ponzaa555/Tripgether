"use client"

import { useMutation, useOthers, useSelf, useStorage } from "@liveblocks/react"
import { ArrowBigDown, ArrowUp, ChevronDown, SmilePlus } from "lucide-react"
import { UserAvatar } from "./user-avartar"
import { Hint } from "@/src/components/hint"
import { Textarea } from "@/src/components/UI/textarea"
import React, { useRef, useState } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import LiveTextArea from "./live-textarea"


interface DescriptionProps {

}

export const Description = () => {

    return (
        <div className=" MuiBox-root css-0" id="Description">
            <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 
                py-10 rounded-none mobile:px-4 tablet:px-10 px-[5.7rem] css-4e39zc
                ">
                {/* Head */}
                <div className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr"
                    style={{
                        minHeight: "0px",
                        height: "auto",
                        transitionDuration: "300ms",
                    }}
                >
                    <LiveTextArea/>
                </div>
            </div>
        </div>
    )
}