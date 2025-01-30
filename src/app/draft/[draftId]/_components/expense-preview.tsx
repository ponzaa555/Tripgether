"use client"

import { ChevronDown } from "lucide-react"
import { InputDate } from "../_planTripComponent/date-input"
import { MoreAction } from "../_planTripComponent/more-action"
import { useRef, useState } from "react"
import { BudgetPlan } from "../_planTripComponent/budget-plan"
import { useMutation, useStorage } from "@liveblocks/react"
import { ExpenseListNoteBudget } from "../_planTripComponent/expense-list-notebudget"
import { ExpenseSumary } from "../_planTripComponent/expense-sumary"
import { AllNote, Destination, NoteType } from "@/src/models/components/Blog"
import { layer } from "@fortawesome/fontawesome-svg-core"


interface ExpensePreviewProps {

}

export const ExpensePreview = ({ }: ExpensePreviewProps) => {

    // const sumCost = useMutation((
        
    // ) => {
    //     let cost = 0
    //     layerIds?.map((dayId:string , index :number) => {
    //         const layer = layers?.get(dayId)
    //         const listDestination: Destination[] = layer["ListDestination"];
    //         const listNoteAndIndex = listDestination.map((value: Destination, index: number) => ({
    //             listNote: value.noteList,
    //             destinationIndex: index,
    //         }));
    //         listNoteAndIndex.map((destination, destinationIndex) => (
    //             destination.listNote.map((note: NoteType, noteListIndex: number) => {
    //                 if (note.noteType === AllNote.Expens) {
    //                     cost += Number(note.cost)
    //                 }
    //                 return null; // Return null for non-expense notes
    //             })
    //         ))
    //     })
    //     return cost
    // },[])
    const layerIds = useStorage((root) => root.layerIds)?.slice(4,);
    const layers = useStorage((root) => root.layers);
    const [isOpenTrip, setIsOpenTrip] = useState(true);
    const [isOpenExpenseNote, setIsOpenExpenseNote] = useState(true)
    const contentRef = useRef(null)
    // const cost = sumCost()
    return (
        <div className="py-10 rounded-none mobile:px-4  px-[5.7rem] ">

            <div className="">
                {/* Header */}
                <div className=" flex justify-between items-center w-full">
                    <div className="flex gap-x-4 items-center">
                        <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium self-start css-9lpudm bg-slate-100 rounded-sm p-1" type="button"
                            onClick={() => setIsOpenTrip(!isOpenTrip)}>
                            <span>
                                <ChevronDown className={`transform transition-transform duration-500 ${isOpenTrip ? 'rotate-180' : 'rotate-0'}`} />
                            </span>
                        </button>
                        <h3>Expenses</h3>
                    </div>
                </div>
            </div>
            <div ref={contentRef}
                className={` overflow-hidden w-full  mt-5  rounded-md font-light transition-all duration-500 ease-in-out  space-y-5
                    ${isOpenTrip ? ' max-h-full opacity-100 ' : 'max-h-0  opacity-0'}
                    `}
            >
                <div className=" mt-2">
                    {/* BudgetPlan */}
                    <BudgetPlan day="5" money={5000} stDate="2025-01-01" endDate="2025-01-09" />
                </div>
                <div>
                    {/* head List expense */}
                    <div>
                        <div className=" flex items-center w-full">
                            <div className="flex gap-x-4 items-center">
                                <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium self-start css-9lpudm bg-slate-100 rounded-sm p-1" type="button"
                                    onClick={() => setIsOpenExpenseNote(!isOpenExpenseNote)}>
                                    <span>
                                        <ChevronDown className={`transform transition-transform duration-500 ${isOpenExpenseNote ? 'rotate-180' : 'rotate-0'}`} />
                                    </span>
                                </button>
                                <div className=" space-x-3">
                                    <button className=" bg-orange-400 text-white rounded-full py-1 px-6 text-sm"> All</button>
                                </div>
                            </div>
                        </div>
                        <div ref={contentRef}
                            className={` overflow-hidden w-full  mt-5  rounded-md font-light transition-all duration-500 ease-in-out  space-y-5
                        ${isOpenExpenseNote ? ' opacity-100 ' : 'max-h-0  opacity-0'}
                        `}
                        >
                            {/* map expense */}
                            {
                                layerIds?.map((layerIds : string) => {
                                    return(
                                        <ExpenseListNoteBudget dayId={layerIds} key={layerIds}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <ExpenseSumary budget={500000} spend={500}/>
            </div>
        </div>
    )
}