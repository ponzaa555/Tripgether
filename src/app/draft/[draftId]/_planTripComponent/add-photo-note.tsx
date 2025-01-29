"use client"

import { UploadFile } from "antd"
import UploadAddNotePhoto from "./upload-addnote-photo"


interface AddPhotoNoteProps {
    dateId: string,
    placeIndex: number,
    noteIndex: number,
    listImage: UploadFile[]
}

export const AddPhotoNote = ({ dateId , placeIndex , noteIndex , listImage }: AddPhotoNoteProps) => {
    return (
        <div className=" pl-4">
            <UploadAddNotePhoto dateId={dateId} placeIndex={placeIndex} noteIndex={noteIndex} listImage={listImage} />
        </div>
    )
}