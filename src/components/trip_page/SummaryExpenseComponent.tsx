import { AllNote, DayTrips } from "@/src/models/components/Blog";
import ListSummaryExpenseComponent from "@/src/components/trip_page/ListSummaryExpenseComponent";
import TotalSummaryExpenseComponent from "@/src/components/trip_page/TotalSummaryExpenseComponent";
import { format } from "date-fns";

type Props = {
  listDate: DayTrips[];
  startDate: string | undefined;
  endDate: string | undefined;
  days: number;
};

const SummaryExpenseComponent = ({
  listDate,
  startDate,
  endDate,
  days,
}: Props) => {
  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MMM yyyy")
    : "N/A";
  const formattedEndDate = endDate
    ? format(new Date(endDate), "dd MMM yyyy")
    : "N/A";

  const calculateTotalExpense = (listDate: DayTrips[]) => {
    let total = 0;
    listDate.forEach((day) => {
      if (day.ListDestination) {
        day.ListDestination.forEach((destination) => {
          total += destination.noteList.reduce((acc, note) => {
            if (note.noteType === AllNote.Expens) {
              return acc + Number(note.cost ?? 0);
            }
            return acc;
          }, 0);
        });
      }
    });
    return total;
  };
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Expenses</h1>
      <div className="flex flex-row justify-between items-center w-full border-[0.5px] p-4 border-slate-400 rounded-lg">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-thin">Budget plan</p>
          <p className="text-base font-black">{days} Days</p>
          <p className="text-xs font-thin text-slate-300">
            {formattedStartDate} - {formattedEndDate}
          </p>
        </div>

        <p className="text-base font-bold">฿ {10}</p>
      </div>
      <ListSummaryExpenseComponent listDate={listDate} />
      <TotalSummaryExpenseComponent
        budgetPlan={1000}
        tripSpend={calculateTotalExpense(listDate)}
      />
    </div>
  );
};

export default SummaryExpenseComponent;
