import { AllNote, NoteType } from "@/src/models/components/Blog";
import {
  Bus,
  CarFront,
  Coffee,
  Coins,
  Footprints,
  MessageCircle,
  Plane,
  TrainFront,
  Utensils,
} from "lucide-react";
import ImageComponent from "./ImageComponent";

type Props = { noteList: NoteType[] };

const ListIcon = [
  <Footprints strokeWidth={1.5} color="#616161" key={"Footprints"} size={15} />,
  <CarFront strokeWidth={1.5} color="#616161" key={"CarFront"} size={15} />,
  <TrainFront strokeWidth={1.5} color="#616161" key={"TrainFront"} size={15} />,
  <Plane strokeWidth={1.5} color="#616161" key={"Plane"} size={15} />,
];

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

const NoteListComponent = ({ noteList }: Props) => {
  return (
    <div className="flex flex-col">
      {!!noteList.find((note) => note.noteType === AllNote.Note) && (
        <div className="flex flex-col gap-3 mb-3">
          <p>--Caption--</p>
          {noteList.map((note, index) => {
            if (note.noteType === AllNote.Note) {
              return (
                <div key={index} className="flex flex-row items-center pl-8">
                  <MessageCircle />
                  <p className="pl-2">{note.describtion}</p>
                </div>
              );
            }
          })}
        </div>
      )}
      {!!noteList.find((note) => note.noteType === AllNote.Expens) && (
        <div className="flex flex-col gap-3 mb-3">
          <p>--Expenses--</p>
          {noteList.map((note, index) => {
            if (note.noteType === AllNote.Expens) {
              return (
                <div key={index} className="flex flex-row items-center gap-3">
                  <p className="p-1 rounded-full border-[1] bg-amber-100">
                    {expensIconType[note.expenseType].icon}
                  </p>
                  <p className="text-sm">
                    {expensIconType[note.expenseType].title}
                  </p>
                  <p>
                    ฿{" "}
                    {note.cost !== undefined
                      ? new Intl.NumberFormat().format(note.cost)
                      : "N/A"}
                  </p>
                </div>
              );
            }
          })}
        </div>
      )}
      {!!noteList.find((note) => note.noteType === AllNote.Transport) && (
        <div className="flex flex-col gap-3 mb-3">
          <p>--Transport--</p>
          {noteList.map((note, index) => {
            if (note.noteType === AllNote.Transport) {
              return (
                <div key={index} className="flex flex-row items-center gap-3">
                  <p className="">{ListIcon[note.transportType]}</p>
                  <p className="text-xs text-slate-500">{note.describtion}</p>
                </div>
              );
            }
          })}
        </div>
      )}
      {!!noteList.find((note) => note.noteType === AllNote.Photo) && (
        <div className="flex flex-col gap-3">
          <p>--Photo--</p>
          {noteList.map((note, index) => {
            if (note.noteType === AllNote.Photo) {
              return <ImageComponent key={index} images={note.listImage} />;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default NoteListComponent;
