import { MdCurrencyBitcoin } from "react-icons/md";
import ListSummaryExpenseComponent from "./ListSummaryExpenseComponent";
import TotalSummaryExpenseComponent from "./TotalSummaryExpenseComponent";

const SummaryExpenseComponent = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Expenses</h1>
      <div className="flex flex-row justify-between items-center w-full border-[0.5px] p-4 border-slate-400 rounded-lg">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-thin">Budget plan</p>
          <p className="text-base font-black">{10} Days</p>
          <p className="text-xs font-thin text-slate-300">
            30 May 2023 - 07 Jun 2023
          </p>
        </div>

        <p className="text-base font-bold">฿ {10}</p>
      </div>
      <ListSummaryExpenseComponent />
      <TotalSummaryExpenseComponent />
    </div>
  );
};

export default SummaryExpenseComponent;
