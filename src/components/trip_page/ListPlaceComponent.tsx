import { Button } from "@/src/components/UI/Button";
import { HiLocationMarker } from "react-icons/hi";
import ExpensesComponent from "./ExpensesComponent";
import { FaCarSide } from "react-icons/fa";
import ImageComponent from "./ImageComponent";

const ListPlaceComponent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="pl-10 flex flex-col gap-5">
        <Button className="w-min">
          <HiLocationMarker />
          Get direction
        </Button>
        <p>
          {
            "คำอธิบายของวันที่ 1 เทสว่ายาวได้มากแค่ไหนถ้าพิมยาวขึ้นอีกแค่ไหนลองพิมให้ยาวที่สุดดู"
          }
        </p>
      </div>
      <div className="border-[1px] my-2"></div>
      <div className="flex flex-row items-center">
        <div className="border-2 p-2 rounded-full">1</div>
        <p className="pl-3">
          {"Title น้ำตกแม่นางรองทางเหนืออเมริกาใต้ที่ค่อนขางจะยาวเล็กน้อย"}
        </p>
      </div>
      <ExpensesComponent />
      <div className="flex flex-row">
        <FaCarSide size={20} className="ml-2" />
        <p className="pl-5 text-xs font-light text-slate-400">
          {100} km ({"เวลาการเดินทาง"})
        </p>
      </div>
      <ImageComponent />
    </div>
  );
};

export default ListPlaceComponent;
