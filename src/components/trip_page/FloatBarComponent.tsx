import { LiaMapMarkerSolid } from "react-icons/lia";
import { IoMdTime } from "react-icons/io";
import { SlPicture } from "react-icons/sl";
import { IoNavigateCircleOutline } from "react-icons/io5";

type Props = {
  visitPlaces: number;
  days: number;
  media: number;
  km: number;
};

const FloatBarComponent = ({ visitPlaces, days, media, km }: Props) => {
  return (
    <div className="grid grid-cols-4 w-full justify-evenly rounded-md py-2 shadow-xl sm:w-96">
      <div className="flex flex-col justify-center items-center border-r-2 border-dashed gap-2">
        <LiaMapMarkerSolid size={25} color="gray" />
        <p className="text-sm font-black">{visitPlaces}</p>
        <p className="text-xs">Visit Places.</p>
      </div>
      <div className="flex flex-col justify-center items-center border-r-2 border-dashed gap-2">
        <IoMdTime size={25} color="gray" />
        <p className="text-sm font-black">{days}</p>
        <p className="text-xs">Days.</p>
      </div>
      <div className="flex flex-col justify-center items-center border-r-2 border-dashed gap-2">
        <SlPicture size={25} color="gray" />
        <p className="text-sm font-black">{media}</p>
        <p className="text-xs">Media</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <IoNavigateCircleOutline size={25} color="gray" />
        <p className="text-sm font-black">{km}</p>
        <p className="text-xs">KM</p>
      </div>
    </div>
  );
};

export default FloatBarComponent;
