"use client"

import { CirclePlus, Pencil, PencilLine, Plus } from "lucide-react"
import { BudgetPlanButton } from "./budget-plan-button"
import MyDialog from "@/src/components/UI/MyDialog"
import { ChangeEvent, useState } from "react"
import { MyDialogProps } from "@/src/models/components/myDialog"
import { Button } from "@/src/components/UI/Button"
import { useMutation } from "@liveblocks/react"
import { LiveObject } from "@liveblocks/client"
import { TripContentType } from "@/src/models/components/Blog"


interface BudgetPlanProps {
    day: string,
    money: number,
    stDate: string,
    endDate: string
}

export const BudgetPlan = ({
    day,
    money,
    stDate,
    endDate,
}: BudgetPlanProps) => {

    const [budgetDialog, setBudgetDialog] = useState(false)
    const [budget, setBudget] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.value);
    };

    const updateBudget = useMutation((
        { storage }
    ) => {
        const layers = storage.get("layers")
        let layer = layers.get("Budget");

        if (!layer) {
            layers.set("Budget", new LiveObject({
                type: TripContentType.Budget,
                stDate: "2024-05-02",
                endDate: "2024-05-03",
                budget: Number(budget),
            }))
        } else {
            layer.set("budget", Number(budget)); // Use .set() to update LiveObject
        }
        setBudgetDialog(false)
    }, [budget])
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
            <div className=" flex  items-center justify-center space-x-3 mb-3 pt-4 pb-2" onClick={() => setBudgetDialog(true)}>
                <BudgetPlanButton icon={<Pencil size={20} strokeWidth={1} fill="#000" color="#fff" />} lable="Edit Butget" />
            </div>
            <MyDialog title="Edit budget" isOpen={budgetDialog} setIsOpen={setBudgetDialog}>
                <div  className="flex flex-col gap-2">
                    <label className="block">Budget Plan</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={handleChange}
                        className="border p-2"
                    />
                    <Button onClick={updateBudget} >
                        Submit
                    </Button>
                </div>
            </MyDialog>
        </div>
    )
}

