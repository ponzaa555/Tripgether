"use client"

import { useMutation, useMyPresence, useOthers, useSelf, useStorage, useUpdateMyPresence } from "@liveblocks/react"
import { ArrowBigDown, ArrowUp, ChevronDown, SmilePlus } from "lucide-react"
import { UserAvatar } from "./user-avartar"
import { Hint } from "@/src/components/hint"
import { Textarea } from "@/src/components/UI/textarea"
import React, { useRef, useState } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import LiveTextArea from "./live-textarea"
import Selection from "./Selection"


interface DescriptionProps {
}

export const Description = ({}:DescriptionProps) => {
   
    return (
        <div className=" MuiBox-root css-0 "
        >
            <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 
                py-10 rounded-none mobile:px-4 tablet:px-10 px-[5.7rem] css-4e39zc
                ">
                {/* Head */}
                
                    <LiveTextArea/>
            </div>
        </div>
    )
}


