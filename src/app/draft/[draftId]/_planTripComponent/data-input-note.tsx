"use client"

import { AllNote, Expense, NoteType } from "@/src/models/components/Blog"
import { LiveObject } from "@liveblocks/client"
import { useMutation } from "@liveblocks/react"
import { MessageSquareText, MessagesSquare } from "lucide-react"
import { useState } from "react"

interface DataInputProps {
    dateId: string,
    placeIndex: number,
    noteIndex: number,
    value: string | number | undefined,
    placeholder: string,
    type: string,
    jsonKey: string,
    noteType: AllNote,
    id? :string
}

export const DataInput = ({ dateId, placeIndex, noteIndex, value, placeholder, type, jsonKey, noteType ,id}: DataInputProps) => {

    const updateInput = useMutation((
        { storage },
        newValue: string | number
    ) => {
        const layers = storage.get("layers")
        const layer = layers.get(dateId)


        const listDestination = layer?.get("ListDestination")
        const { noteList } = listDestination[placeIndex]
        noteList[noteIndex][jsonKey] = newValue

        layer?.set("ListDestination", listDestination)
        if(noteType === AllNote.Expens) {
            updateExpenseList(noteList[noteIndex].id , noteList[noteIndex])
        }
    }, [])
    const updateExpenseList = useMutation((
        {storage},
        expenseId : string,
        newValue: Expense,
    ) => {
        const layers = storage.get("layers")
        const layer = layers.get("ExpenseList")
        const list : Expense[] = layer?.get("expenseList")
        if(type === "number"){
            const spendLayer = layer?.get("Spend")
            if(spendLayer === undefined) {
                layers.set("Spend",new LiveObject({
                    cost : Number({newValue})
                }))
            }else{
                const lastCost = spendLayer.cost 
                layer?.set("Spend" , lastCost + Number(newValue) - Number(value))
            }
        }

        let expense = list.find(expen => expen.id === expenseId)
        expense = newValue

        layer?.set("expenseList" , list)
    },[])
    switch (noteType) {
        case AllNote.Note:
            return (
                <div className=" w-full pl-4">
                    <div className=" flex w-full bg-white p-4 rounded-md hover:bg-[#F4F8FB] hover:border-slate-200 hover:border  gap-x-2 pl-4 ">
                        <MessageSquareText scale={1} strokeWidth={1} />
                        <textarea className=" w-full  bg-transparent hover:border-slate-200 hover:bg-[#F4F8FB]  text-xs 
                          placeholder:text-slate-300  rounded-md outline-none"
                            placeholder={placeholder}
                            value={value}
                            rows={2}
                            onChange={(e) => updateInput(e.target.value)}
                            id={`noteIndex${dateId}${noteIndex}`}
                        />
                    </div>
                </div>

            )
        case AllNote.Expens:
            return (
                <>
                    <input className=" w-full  bg-transparent hover:border-slate-200 hover:bg-[#F4F8FB] hover:border text-xs 
                          placeholder:text-slate-300 py-2 px-2 rounded-md outline-none"
                        placeholder={placeholder}
                        value={value}
                        type={type}
                        onChange={(e) => updateInput(e.target.value)}
                        id={id}
                    />
                </>

            )
    }
}