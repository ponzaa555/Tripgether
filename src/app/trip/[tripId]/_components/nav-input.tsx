"use client"

import { Hint } from "@/src/components/hint"
import { PenBox, PencilIcon, PenIcon } from "lucide-react"
import { useState } from "react"

interface NavInpthProps {
    tripName?: string
}

export const NavInput = ({ tripName }: NavInpthProps) => {
    const [titleName , setTiitleName] = useState(tripName);
    return (
        <div className=" flex w-full ">
            <label className="  relative w-full">
                <input className="border-transparent  rounded-lg bg-[#F4F5F8] text-black text-md pr-12 pl-3 leading-8 font-semibold focus:border-[#C5C7CB4D] focus:ring-0 w-full"
                    value={titleName} 
                    onChange={(e) => setTiitleName(e.target.value)}/>
                <span className=" absolute  right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-xl flex items-center justify-center">
                    <Hint label="Edit trip name" side="bottom" sideOffset={3} >
                        <PencilIcon />
                    </Hint>
                </span>
            </label>
        </div>
    )
}