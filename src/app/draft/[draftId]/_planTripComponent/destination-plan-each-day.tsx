import { AllNote, Destination, NoteType } from "@/src/models/components/Blog";
import { EllipsisVertical, GripVertical, PencilLine, Star } from "lucide-react";
import Marker from "./mark-destination";
import { MoreAction } from "./more-action";
import { AddNoteDropdown } from "./add-note-dropdown";
import { NoteListPreview } from "./note-list-preview";


interface DestinationPlanProps {
    id: string
    place: string,
    noteList: NoteType[],
    planIndex: number,
    deletePlace: (index: number) => void,
}

export const DestinationPlan = ({
    id,
    place,
    noteList,
    planIndex,
    deletePlace,
}: DestinationPlanProps) => {
    return (
        <div className=" w-full  relative ">
            {/* Destiantion */}
            <div className=" flex gap-x-2 items-center ">
                <GripVertical />
                <Marker number={planIndex + 1} />
                <div className=" flex flex-grow  bg-[#F4F8FB] p-2 justify-between rounded-md items-center">
                    <p className=" text-sm">{place}</p>
                    <div className="flex gap-x-4 items-center">
                        <button>
                            <Star />
                        </button>
                        <button>
                            <PencilLine />
                        </button>
                    </div>
                </div>
                <MoreAction lable="Mange this plan" index={planIndex} deleteHandle={deletePlace}  typeAction="Place" />
            </div>
            <div className=" w-full pl-4 mt-5">
                <div className=" flex flex-col gap-y-10  border-l border-dashed">
                    {/* map note */}
                    {
                        noteList.map((note: NoteType, index: number) => (
                            <div className=" flex-row w-full  items-center " key={index}>
                                <NoteListPreview key={index} noteType={note} noteListIndex={index} planIndex={planIndex} planId={id} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className=" flex-row  w-full  items-center text-gray-200 my-5  relative z-50">
                <AddNoteDropdown index={planIndex} id={id} />
            </div>
        </div>
    )
}