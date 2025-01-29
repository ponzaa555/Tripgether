import { ImSpoonKnife } from "react-icons/im";
import { FaTicketAlt } from "react-icons/fa";

const ExpensesComponent = () => {
  return (
    <div>
      <div className="flex flex-row pt-4 items-center">
        <div className="border-2 p-2 rounded-full bg-slate-200 border-slate-50">
          <ImSpoonKnife size={17} color="orange" />
        </div>
        <p className="pl-3 text-xs">{"ค่าอาหารกลางวัน ฿ 200 บาท"}</p>
      </div>
      <div className="flex flex-row pt-4 items-center">
        <div className="border-2 p-2 rounded-full bg-slate-200 border-slate-50">
          <FaTicketAlt size={17} color="orange" />
        </div>
        <p className="pl-3 text-xs">{"ค่านำรถเข้า ฿ 40 บาท"}</p>
      </div>
    </div>
  );
};

export default ExpensesComponent;
