"use client"

import { MessagesSquare, X } from "lucide-react"
import { DataInput } from "./data-input-note"
import { AllNote} from "@/src/models/components/Blog"
import { Selections } from "../_components/Selection";

interface NoteProps {
    dateId: string,
    placeIndex: number,
    noteIndex: number,
    value: string | number | undefined,
    updateMyPresence: (patch: Partial<{ focusedId: string | null }>, options?: { addToHistory: boolean }) => void;
    deleteNote : () => void      
}
export const Note = ({ 
    dateId , 
    placeIndex ,
    noteIndex,
    value,
    updateMyPresence,
    deleteNote
}: NoteProps) => {
    return (
        // <div className=" w-full flex items-center gap-x-2 pl-4">
        //     <div className=" flex w-full bg-white p-4 rounded-md gap-x-3  hover:bg-[#F4F8FB] hover:border-slate-200 hover:border">
        //         <MessagesSquare scale={1} strokeWidth={1} />
        //         <DataInput dateId={dateId} placeIndex={placeIndex} noteIndex={noteIndex} placeholder="Add note here" value={value} type="string" jsonKey="describtion" 
        //         noteType={AllNote.Note}  />
        //     </div>
        // </div>
        <div  id={`noteIndex${noteIndex}`}
        onFocus={(e) => {
            console.log(e.target)
            updateMyPresence({focusedId:e.target.id})
        }}
        className=" relative flex justify-between items-center gap-x-2">
            <DataInput dateId={dateId} placeIndex={placeIndex} noteIndex={noteIndex} placeholder="Add note here" value={value} type="string" jsonKey="describtion" 
                    noteType={AllNote.Note}  />
            <Selections id={`noteIndex${dateId}${noteIndex}`}/>
            <X size={15} onClick={deleteNote} className=" cursor-pointer"/>
        </div>
    )
}