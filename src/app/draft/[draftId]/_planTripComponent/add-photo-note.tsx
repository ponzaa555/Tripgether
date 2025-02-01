"use client"

import { UploadFile } from "antd"
import UploadAddNotePhoto from "./upload-addnote-photo"
import { Selections } from "../_components/Selection"


interface AddPhotoNoteProps {
    dateId: string,
    placeIndex: number,
    noteIndex: number,
    listImage: UploadFile[]
}

export const AddPhotoNote = ({ dateId , placeIndex , noteIndex , listImage  }: AddPhotoNoteProps) => {
    return (
        <div className=" pl-4 relative" >
            <UploadAddNotePhoto dateId={dateId} placeIndex={placeIndex} noteIndex={noteIndex} listImage={listImage} />
            <Selections id={`Image${dateId}${noteIndex}`}/>
        </div>
    )
}