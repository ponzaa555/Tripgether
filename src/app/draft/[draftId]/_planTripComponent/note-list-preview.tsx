"use client"

import { AllNote, NoteType } from "@/src/models/components/Blog"
import { Note } from "./Note"
import { TransportNote } from "./transport-note"
import { ExpenseNote } from "./expense-note"
import { AddPhotoNote } from "./add-photo-note"
import { useMutation, useUpdateMyPresence } from "@liveblocks/react"



interface NoteListPreviewProps {
    planId: string
    noteType: NoteType,
    noteListIndex: number,
    planIndex: number
}

export const NoteListPreview = ({ planId, noteType, noteListIndex, planIndex }: NoteListPreviewProps) => {
    // return(
    //     <button
    //     onClick={() => {
    //         console.log(noteType)
    //     }}> click</button>
    // )
    const deleteNote = useMutation((
        { storage }
    ) => {
        const layers = storage.get("layers")
        const layer = layers.get(planId)

        const listDes = layer?.get("ListDestination")
        const des = listDes[planIndex]
        console.log(des)
        const {noteList} = des
        console.log({ noteList })
        const newNoteList = noteList.filter((e,i) => i !== noteListIndex)
        console.log({newNoteList})

        listDes[planIndex].noteList = newNoteList
        layer.set("ListDestination", listDes) // set will trggle reload by liveblock lib
    },[])
    const updateMyPresence = useUpdateMyPresence();
    switch (noteType.noteType) {
        case AllNote.Note:
            return (
                <Note dateId={planId} placeIndex={planIndex} noteIndex={noteListIndex} value={noteType.describtion} updateMyPresence={updateMyPresence} deleteNote={deleteNote} />
            )
        case AllNote.Transport:
            return (
                <TransportNote
                    transportType={noteType.transportType}
                    describtion={noteType.describtion}
                    planIndex={planIndex}
                    noteListIndex={noteListIndex}
                    planId={planId}
                    updateMyPresence={updateMyPresence} 
                    deleteNote={deleteNote}/>
            )
        case AllNote.Expens:
            return (
                <ExpenseNote
                    dateId={planId}
                    placeIndex={planIndex}
                    noteIndex={noteListIndex}
                    value={noteType.describtion}
                    iconType={noteType.expenseType}
                    cost={noteType.cost}
                    updateMyPresence={updateMyPresence}
                    deleteNote={deleteNote}
                />
            )
        case AllNote.Photo:
            return (
                <AddPhotoNote
                    dateId={planId}
                    placeIndex={planIndex}
                    noteIndex={noteListIndex}
                    listImage={noteType.listImage}
                    deleteNote={deleteNote}
                />
            )
    }
}