"use client"

import { icon } from "@fortawesome/fontawesome-svg-core"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Bitcoin, Bus, Coffee, Coins, Utensils } from "lucide-react"
import { DataInput } from "./data-input-note"
import { useMutation } from "@liveblocks/react"
import {AllNote, Expense} from "@/src/models/components/Blog"
import { Selections } from "../_components/Selection"


interface ExpenseNoteProps {
    dateId: string,
    placeIndex: number,
    noteIndex: number,
    value: string |undefined,
    cost : number | undefined,
    iconType: number,
    updateMyPresence: (patch: Partial<{ focusedId: string | null }>, options?: { addToHistory: boolean }) => void;
}

export const ExpenseNote = ({
    dateId,
    placeIndex,
    noteIndex,
    value,
    iconType,
    cost,
    updateMyPresence
}: ExpenseNoteProps) => {

    const updateExpenseIcon = useMutation((
        {storage},
        iconIndex : number
    ) => {
        const layers = storage.get("layers")
        const layer = layers.get(dateId)

        const listDestination = layer?.get("ListDestination")
        const {noteList} = listDestination[placeIndex]
        noteList[noteIndex].expenseType = iconIndex

        layer?.set("ListDestination" , listDestination)
    },[])

    const expensIcon: expensIconType[] = [
        { icon: <Coins strokeWidth={1} fill="#ffe082"  />, title: "Etc" },
        { icon: <Utensils strokeWidth={1} fill="#ffe082" />, title: "Food" },
        { icon: <Coffee strokeWidth={1} fill="#ffe082" />, title: "Drink" },
        { icon: <Bus strokeWidth={1} fill="#ffe082" />, title: "Public Transport" }
    ]
    return (
        <div className=" w-full flex items-center gap-x-4 pl-6 relative">
            <DropdownMenu>
                <DropdownMenuTrigger className=" flex items-center" id={`expenseIcon${dateId}${noteIndex}`}
                    onFocus={(e) => updateMyPresence({focusedId:e.target.value})}
                    onBlur={(e) => updateMyPresence({focusedId:null})}>
                    <ExpenseIcon iconNumber={iconType} expensIcon={expensIcon} />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" sideOffset={3}>
                    <DropdownMenuItem className=" border-dashed border border-yellow-300 gap-x-2 bg-white p-1 rounded-md outline-none 
                    shadow-[0px_-4px_6px_rgba(0,0,0,0.1),4px_0px_6px_rgba(0,0,0,0.1),0px_4px_6px_rgba(0,0,0,0.1)]">

                        {
                            expensIcon.map((expensIcon: expensIconType, index: number) => {
                                return (
                                    <button
                                        key={index}
                                        className={`flex  rounded-md p-1 hover:bg-slate-100 space-x-2 px-2 py-1 text-sm w-full`}
                                        onClick={() => updateExpenseIcon(index)}>
                                        {expensIcon.icon}
                                        <p className=" text-xs font-light">{expensIcon.title}</p>
                                    </button>
                                )
                            })
                        }
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DataInput placeIndex={placeIndex} dateId={dateId} noteIndex={noteIndex} value={value} placeholder="Add expense description" type="text" jsonKey="describtion" noteType={AllNote.Expens}  id={`expenseIcon${dateId}${noteIndex}`}/>
            <Bitcoin strokeWidth={3} scale={1} />
            <div className=" w-1/5">
                <DataInput placeIndex={placeIndex} dateId={dateId} noteIndex={noteIndex} value={cost} placeholder="amount" type="number" jsonKey="cost" noteType={AllNote.Expens} id={`expenseIcon${dateId}${noteIndex}`}></DataInput>
            </div>
            <Selections id={`expenseIcon${dateId}${noteIndex}`}/>
        </div>
    )
}

type expensIconType = {
    icon: JSX.Element,
    title: string
}

interface ExpenseIconIconProps {
    iconNumber: number;
    expensIcon: expensIconType[]
}


const ExpenseIcon = ({ iconNumber, expensIcon }: ExpenseIconIconProps) => {
    return (
        <button className="  bg-yellow-100 rounded-full p-1 border-orange-400 border">
            {expensIcon[iconNumber].icon}
        </button>
    )
}