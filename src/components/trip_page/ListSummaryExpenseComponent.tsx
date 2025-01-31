import { AllNote, DayTrips } from "@/src/models/components/Blog";
import { Bus, Coffee, Coins, Utensils } from "lucide-react";

type Props = {
  listDate: DayTrips[];
};

type expensIconType = {
  icon: JSX.Element;
  title: string;
};

const expensIconType = [
  { icon: <Coins strokeWidth={1} fill="#ffe082" />, title: "Etc" },
  { icon: <Utensils strokeWidth={1} fill="#ffe082" />, title: "Food" },
  { icon: <Coffee strokeWidth={1} fill="#ffe082" />, title: "Drink" },
  { icon: <Bus strokeWidth={1} fill="#ffe082" />, title: "Public Transport" },
];

const ListSummaryExpenseComponent = ({ listDate }: Props) => {
  const expenses = listDate.flatMap((day) =>
    day.ListDestination.flatMap((destination) =>
      destination.noteList
        .filter((note) => note.noteType === AllNote.Expens)
        .map((note) => ({
          date: day.date,
          description: note.describtion,
          cost: note.cost,
          expenseType: note.expenseType,
        }))
    )
  );

  return (
    <div className="flex flex-col gap-3">
      {expenses.map((expense, index) => (
        <div
          className="flex flex-row justify-between items-center w-full border-[0.5px] p-2 border-slate-400 rounded-lg"
          key={index}
        >
          <div className="flex flex-row gap-1 justify-center items-center">
            <div className="border-2 p-2 rounded-full bg-slate-200 border-slate-50">
              {expensIconType[expense.expenseType].icon}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-slate-400">
                {expense.date} - {expensIconType[expense.expenseType].title}
              </p>
              <p className="text-sm font-black">{expense.description}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-black">
              ฿{" "}
              {expense.cost !== undefined
                ? new Intl.NumberFormat().format(expense.cost)
                : "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListSummaryExpenseComponent;
