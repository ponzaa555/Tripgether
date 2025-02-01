"use client"

import { AllNote, NoteType } from "@/src/models/components/Blog"
import { Note } from "./Note"
import { TransportNote } from "./transport-note"
import { ExpenseNote } from "./expense-note"
import { AddPhotoNote } from "./add-photo-note"
import { useUpdateMyPresence } from "@liveblocks/react"



interface NoteListPreviewProps {
    planId : string
    noteType: NoteType,
    noteListIndex: number,
    planIndex: number
}

export const NoteListPreview = ({ planId, noteType ,noteListIndex ,planIndex }: NoteListPreviewProps) => {
    // return(
    //     <button
    //     onClick={() => {
    //         console.log(noteType)
    //     }}> click</button>
    // )
    const updateMyPresence = useUpdateMyPresence();
    switch (noteType.noteType) {
        case AllNote.Note:
            return (
                <Note dateId={planId} placeIndex={planIndex} noteIndex={noteListIndex} value={noteType.describtion} updateMyPresence={updateMyPresence} />
            )
        case AllNote.Transport:
            return (
                <TransportNote
                    transportType={noteType.transportType}
                    describtion={noteType.describtion} 
                    planIndex={planIndex}
                    noteListIndex={noteListIndex}
                    planId={planId}
                    updateMyPresence={updateMyPresence}/>
            )
        case AllNote.Expens :
            return (
                <ExpenseNote
                dateId={planId}
                placeIndex={planIndex}
                noteIndex={noteListIndex}
                value={noteType.describtion}
                iconType={noteType.expenseType}
                cost={noteType.cost}
                updateMyPresence={updateMyPresence}
                />
            )
        case AllNote.Photo :
            return(
                <AddPhotoNote
                dateId={planId}
                placeIndex={planIndex}
                noteIndex={noteListIndex}
                listImage={noteType.listImage}
                />
            )
    }
}