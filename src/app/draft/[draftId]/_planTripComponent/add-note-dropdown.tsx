"use client"

import { Hint } from "@/src/components/hint"
import { Button } from "@/src/components/UI/Button"
import { DropdownMenu } from "@/src/components/UI/dropdown-menu"
import MyDialog from "@/src/components/UI/MyDialog"
import { AllNote, Expense, Note, NoteType, Photo, Transport } from "@/src/models/components/Blog"
import { useMutation } from "@liveblocks/react"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { CalendarPlus, Car, Image, NotebookIcon, PiggyBank, StickyNoteIcon } from "lucide-react"
import { nanoid } from "nanoid"
import { useState } from "react"


interface AddNoteDropdownProps {
    id: string,
    index: number
}

export const AddNoteDropdown = ({ id, index }: AddNoteDropdownProps) => {
    const InsertNote = useMutation((
        { storage },
        note: NoteType,
    ) => {
        const layers = storage.get("layers")
        const layer = layers.get(id)
        const listDestination = layer?.get("ListDestination")
        const destinationObject = listDestination![index]
        console.log(destinationObject)
        const { noteList } = destinationObject
        noteList.push(note);
        console.log(noteList)
        layer!.set("ListDestination", listDestination)
    }, [])

    const InsertSeperateList = useMutation((
       {storage},
       idName : string ,
       note: NoteType,
       key : string
    ) => {
        const layers = storage.get("layers")
        const layer = layers.get(idName)
        console.log({layer})
        let list = layer?.get(key)
        console.log({list})
        if(list === null){
            list = [note]
        }else{
            list.push(note)
        }

        layer?.set(key,list)
    },[])
    const handleInsertNotedescription = () => {
        const note: Note = {
            noteType: AllNote.Note,
            describtion: undefined
        }
        InsertNote(note);
    }
    const handleNoteTrasportTation = () => {
        const transport: Transport = {
            noteType: AllNote.Transport,
            transportType: 2,
            describtion: "Very far 100 km",
        }
        InsertNote(transport)
    }
    const handleNoteExpense = () => {
        const id = nanoid()
        const expense : Expense = {
            noteType : AllNote.Expens,
            expenseType : 0,
            describtion : undefined ,
            cost : undefined,
            id:id
        }
        InsertNote(expense)
        InsertSeperateList("ExpenseList",expense,"expenseList")
    }
    const handleNotePhoto = () => {
        console.log("Insert Photo")
        const photoNote : Photo = {
            noteType : AllNote.Photo,
            listImage : []
        }
        InsertNote(photoNote)
    }
    const [isOpen , setIsOpen] = useState(false)
    return (
            <DropdownMenu>
                <DropdownMenuTrigger className=" outline-none">
                    <Hint label="Add note option" side="right" sideOffset={10} >
                        <Button className=" text-sm rounded-full my-2  " size="icon"
                            onClick={() =>setIsOpen(!isOpen)}>
                            +
                        </Button>
                    </Hint>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" sideOffset={3} className=" bg-white rounded-lg  py-2 items-center  mt-3 space-y-3
            shadow-[0px_-4px_6px_rgba(0,0,0,0.1),4px_0px_6px_rgba(0,0,0,0.1),0px_4px_6px_rgba(0,0,0,0.1)] text-black text-xs">
                    <DropdownMenuItem className=" outline-none cursor-pointer hover:bg-slate-200 px-5 py-1">
                        <div className=" flex items-center space-x-2 "
                            onClick={() => handleInsertNotedescription()}>
                            <StickyNoteIcon />
                            <p className="font-light">Add note</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="outline-none cursor-pointer hover:bg-slate-200 px-5 py-1">
                        <div className=" flex  items-center space-x-2 "
                            onClick={() => handleNoteTrasportTation()}
                        >
                            <Car strokeWidth={1.5} scale={1} />
                            <p className="font-light">Add transoporttation</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="outline-none cursor-pointer hover:bg-slate-200 px-5 py-1">
                        <div className=" flex  items-center space-x-2 "
                            onClick={() => handleNoteExpense()}
                        >
                            <PiggyBank strokeWidth={1.5} scale={1}/>
                            <p className="font-light">Add Expense</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="outline-none cursor-pointer hover:bg-slate-200 px-5 py-1">
                        <div className=" flex  items-center space-x-2 "
                        onClick={() => handleNotePhoto()}
                        >
                            <Image strokeWidth={1.5} scale={1}/>
                            <p className="font-light">Add photo</p>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    )
}