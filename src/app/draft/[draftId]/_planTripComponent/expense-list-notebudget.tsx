"use client";

import { AllNote, Destination, Expense, NoteType } from "@/src/models/components/Blog";
import { useStorage } from "@liveblocks/react";
import { Bus, Coffee, Coins, EllipsisVertical, Utensils } from "lucide-react";
import { MoreAction } from "./more-action";

interface ExpenseListNoteBudgetProps {
    dayId: string;
}

export const ExpenseListNoteBudget = ({ dayId }: ExpenseListNoteBudgetProps) => {
    const layers = useStorage((root) => root.layers);
    const layer = layers?.get(dayId);

    // Ensure `layer` exists before accessing its properties
    if (!layer) {
        return <p>No data available for the selected day.</p>;
    }

    const date = layer["date"];
    const listDestination: Destination[] = layer["ListDestination"];

    const listNoteAndIndex = listDestination.map((value: Destination, index: number) => ({
        listNote: value.noteList,
        destinationIndex: index,
    }));

    return (
        <>
            {listNoteAndIndex.map((destination, destinationIndex) => (
                destination.listNote.map((note: NoteType, noteListIndex: number) => {
                    if (note.noteType === AllNote.Expens) {
                        return (
                            <div key={`${destinationIndex}-${noteListIndex}`}>
                                <ExpenseNoteBudget
                                    date={date}
                                    dayId={dayId}
                                    destinationIndex={destinationIndex}
                                    expenseNote={note as Expense} // Ensure `note` matches the `Expense` interface
                                    noteListIndex={noteListIndex}
                                />
                            </div>
                        );
                    }
                    return null; // Return null for non-expense notes
                })
            ))}
        </>
    );
};

interface ExpenseNoteBudgetProps {
    date: string;
    expenseNote: Expense;
    dayId: string;
    destinationIndex: number;
    noteListIndex: number;
}

type ExpensIconType = {
    icon: JSX.Element;
    title: string;
};

export const ExpenseNoteBudget = ({
    date,
    dayId,
    destinationIndex,
    expenseNote,
    noteListIndex,
}: ExpenseNoteBudgetProps) => {
    const expensIcon: ExpensIconType[] = [
        { icon: <Coins strokeWidth={1} fill="#ffe082" />, title: "Etc" },
        { icon: <Utensils strokeWidth={1} fill="#ffe082" />, title: "Food" },
        { icon: <Coffee strokeWidth={1} fill="#ffe082" />, title: "Drink" },
        { icon: <Bus strokeWidth={1} fill="#ffe082" />, title: "Public Transport" },
    ];

    
    // Validate `noteType` index to avoid runtime errors
    const validNoteType = expenseNote.noteType >= 0 && expenseNote.noteType < expensIcon.length
        ? expenseNote.noteType
        : 0;

    return (
        <div className="flex space-x-3 w-full">
            {/* Expense Note Card */}
            <div className="border border-slate-200 rounded-lg flex justify-between items-center px-2 py-2 w-full">
                <div className="flex items-center gap-x-3 w-full">
                    {expensIcon[expenseNote.expenseType].icon}
                    <div>
                        <p className="text-xs items-center text-slate-300">
                            {date} - {expensIcon[validNoteType].title}
                        </p>
                        <p className="text-sm">{expenseNote.describtion}</p>
                    </div>
                </div>
                <p className="flex text-sm items-center">
                    <span>฿ </span>
                    {expenseNote.cost}
                </p>
            </div>
            {/* Action Button */}
            {/* <MoreAction lable="" deleteHandle={(noteListIndex) => ()}/> */}
        </div>
    );
};
