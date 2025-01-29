"use client"

import { MessagesSquare } from "lucide-react"
import { DataInput } from "./data-input-note"
import { AllNote} from "@/src/models/components/Blog"

interface NoteProps {
    dateId: string,
    placeIndex: number,
    noteIndex: number,
    value: string | number | undefined,
}
export const Note = ({ 
    dateId , 
    placeIndex ,
    noteIndex,
    value,
}: NoteProps) => {
    return (
        // <div className=" w-full flex items-center gap-x-2 pl-4">
        //     <div className=" flex w-full bg-white p-4 rounded-md gap-x-3  hover:bg-[#F4F8FB] hover:border-slate-200 hover:border">
        //         <MessagesSquare scale={1} strokeWidth={1} />
        //         <DataInput dateId={dateId} placeIndex={placeIndex} noteIndex={noteIndex} placeholder="Add note here" value={value} type="string" jsonKey="describtion" 
        //         noteType={AllNote.Note}  />
        //     </div>
        // </div>
        <DataInput dateId={dateId} placeIndex={placeIndex} noteIndex={noteIndex} placeholder="Add note here" value={value} type="string" jsonKey="describtion" 
                noteType={AllNote.Note}  />
    )
}