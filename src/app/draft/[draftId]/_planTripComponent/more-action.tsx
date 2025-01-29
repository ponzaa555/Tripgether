"use client"

import { Hint } from "@/src/components/hint"
import { DropdownMenu } from "@/src/components/UI/dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { EllipsisVertical, MapPin, Trash } from "lucide-react"

interface MoreActionProps {
    lable: string
    deleteHandle : (index : number | string) => void
    index : number | string
    typeAction : string

}

export const MoreAction = ({ lable , deleteHandle , index ,typeAction}: MoreActionProps) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className=" outline-none">
                <Hint label={lable} side="bottom" sideOffset={3}>
                    <button className=" rounded-full hover:bg-gray-100 duration-500 transition-all ease-in-out p-1">
                        <EllipsisVertical />
                    </button>
                </Hint>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" sideOffset={3}  className=" bg-white rounded-lg  py-1 items-center  mt-3 space-y-3
            shadow-[0px_-4px_6px_rgba(0,0,0,0.1),4px_0px_6px_rgba(0,0,0,0.1),0px_4px_6px_rgba(0,0,0,0.1)] text-sm">
            {
                typeAction === "Place" ? (
                <DropdownMenuItem className=" outline-none cursor-pointer hover:bg-slate-200 px-3 py-2">
                    <div className=" flex items-center space-x-2 ">
                        <MapPin scale={1} strokeWidth={1}/>
                        <p className="font-light">Change Place</p>
                    </div>
                </DropdownMenuItem>
                ) : (<>
                </>)
            }
                <DropdownMenuItem className="outline-none cursor-pointer hover:bg-slate-200 px-3 py-2">
                    <div className=" flex  items-center space-x-2 "
                    onClick={() =>  deleteHandle(index! )}>
                        <Trash scale={1} strokeWidth={1}/>
                        <p className="font-light">Delete</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}