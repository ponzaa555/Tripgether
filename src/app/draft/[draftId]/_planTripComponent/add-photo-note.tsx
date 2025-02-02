"use client"

import { UploadFile } from "antd"
import UploadAddNotePhoto from "./upload-addnote-photo"
import { Selections } from "../_components/Selection"
import { X } from "lucide-react"


interface AddPhotoNoteProps {
    dateId: string,
    placeIndex: number,
    noteIndex: number,
    listImage: UploadFile[],
    deleteNote : () => void
}

export const AddPhotoNote = ({ dateId , placeIndex , noteIndex , listImage ,deleteNote }: AddPhotoNoteProps) => {
    return (
        <div className=" pl-4 relative w-full flex items-center justify-between" >
            <UploadAddNotePhoto dateId={dateId} placeIndex={placeIndex} noteIndex={noteIndex} listImage={listImage} />
            <X size={15}  onClick={deleteNote} className=" cursor-pointer"/>
            <Selections id={`Image${dateId}${noteIndex}`}/>
        </div>
    )
}