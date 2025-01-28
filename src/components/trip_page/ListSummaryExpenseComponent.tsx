import { ImSpoonKnife } from "react-icons/im";

const ListSummaryExpenseComponent = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center w-full border-[0.5px] p-2 border-slate-400 rounded-lg">
        <div className="flex flex-row gap-1 justify-center items-center">
          <div className="border-2 p-2 rounded-full bg-slate-200 border-slate-50">
            <ImSpoonKnife size={17} color="orange" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-400">30 May - dinner</p>
            <p className="text-sm font-black">
              {"ค่าเดินทางจาก USA to Thailand"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-black">฿ 200</p>
        </div>
      </div>
    </div>
  );
};

export default ListSummaryExpenseComponent;
