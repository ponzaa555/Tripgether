"use client"

import { CirclePlus, Pencil, PencilLine, Plus } from "lucide-react"
import { BudgetPlanButton } from "./budget-plan-button"

interface BudgetPlanProps {
    day: string,
    money: number,
    stDate : string,
    endDate : string
}

export const BudgetPlan = ({
    day,
    money,
    stDate,
    endDate,
}: BudgetPlanProps) => {
    return (
        <div className=" border-slate-200  rounded-lg border p-4 space-y-3">
            <p className=" text-sm">Budget plan</p>
            <div className=" flex justify-between items-center font-bold">
                <p className=" text-sm">{day} Days</p>
                <div className="flex items-center text-sm">
                    <span>฿</span>
                    <p>{money}</p>
                </div>
            </div>
            <p className=" text-slate-400 text-xs ">{stDate} - {endDate}</p>
            <div className=" flex  items-center justify-center space-x-3 mb-3 pt-4 pb-2">
                <BudgetPlanButton icon={<CirclePlus size={17} strokeWidth={1} fill="#000" color="#fff"/> } lable="Edit Butget" />
                <BudgetPlanButton icon={<Pencil size={20} strokeWidth={1} fill="#000" color="#fff"/> } lable="Edit Butget" />
            </div>
        </div>
    )
}