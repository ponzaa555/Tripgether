import { Button } from "@/src/components/UI/Button";
import { HiLocationMarker } from "react-icons/hi";
import NoteListComponent from "@/src/components/trip_page/NoteListComponent";
import { Destination } from "@/src/models/components/Blog";

type Props = {
  listDestination: Destination[];
  title: string | undefined;
  color: string;
};

const ListPlaceComponent = ({ listDestination, title, color }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="pl-10 flex flex-col gap-5">
        <p>{title}</p>
      </div>
      <div className="border-[1px] my-2"></div>
      {listDestination.map((destination, index) => (
        <div key={index} className="py-5 flex flex-col gap-3">
          <div className={`flex flex-row items-center`}>
            <div
              className={`border-2 p-2 rounded-full text-slate-100`}
              style={{ backgroundColor: color }}
            >
              {destination.order}
            </div>
            <p className="pl-3 text-lg font-black">{destination.place}</p>
          </div>
          <NoteListComponent noteList={destination.noteList} />
        </div>
      ))}
    </div>
  );
};

export default ListPlaceComponent;
