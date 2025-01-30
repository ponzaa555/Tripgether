import { DayTrips, Destination, TripContentType } from "@/src/models/components/Blog"
import { faL } from "@fortawesome/free-solid-svg-icons"
import { useMutation, useStorage, useUpdateMyPresence } from "@liveblocks/react"
import { ChevronDown, GripVertical, MapPin, MapPinPlus } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import { InputDate } from "./date-input"
import { DestinationPlan } from "./destination-plan-each-day"
import { Button } from "@/src/components/UI/Button"
import { Input } from "@/src/components/UI/input"
import { AddTripInput } from "./input-add-trpi"
import { MoreAction } from "./more-action"
import { Selections } from "../_components/Selection"





interface TripPreviewProps {
    key: string,
    id: string,
}
const TripPlanPreview = ({ key, id }: TripPreviewProps) => {
    const layer = useStorage((storage) => storage.layers.get(id))

    const AddDestination = useMutation((
        { storage },
        destination: Destination[]
    ) => {
        const layer = storage.get("layers")
        const dayTrips = layer.get(id)?.set("ListDestination", destination)
    }, [])

    const ResetDestination = useMutation((
        { storage },
    ) => {
        const layer = storage.get("layers")
        const dayTrips = layer.get(id)?.set("ListDestination", [])
    }, [])

    const DeleteDatePlan = useMutation((
        { storage },
        id: string
    ) => {
        const layerIds = storage.get("layerIds")
        const layers = storage.get("layers")
        // const index = layerIds.findIndex(item => item === id)
        // const daylayerId = layerIds.delete(index)
        // const daylayer = layers.delete(id)
    }, [])


    const DeltePlace = useMutation((
        { storage },
        index: number,
    ) => {
        const layer = storage.get("layers").get(id)
        const { ListDestination } = layer?.toObject()
        console.log("ListDes", ListDestination)
        let newListDestiantion;
        // ลบตัวท้ายสุด 
        if (index + 1 === ListDestination.lenght) {
            newListDestiantion = ListDestination.slice(0, index)
        } else {
            newListDestiantion = [...ListDestination.slice(0, index), ...ListDestination.slice(index + 1)]
        }
        layer?.set("ListDestination", newListDestiantion)
    }, [])


    const handleAddDestination = () => {
        const destination: Destination = {
            type: TripContentType.Destination,
            order: 1,
            place: "Thailand",
            noteList: []
        }
        let newDayTrips;
        if (ListDestination === undefined) {
            newDayTrips = [destination]
        } else {
            newDayTrips = [...ListDestination, destination]
        }
        AddDestination(newDayTrips)
    }

    const handleResetDestination = () => {
        ResetDestination();
    }
    const handleDeletePlanHandle = (id: string) => {
        DeleteDatePlan(id)
    }

    const [isOpenTrip, setIsOpenTrip] = useState(true);
    const contentRef = useRef(null)
    // อยาก return skeleton ไปก่อน
    if (!layer) {
        return (
            <div>
                Loading.....
            </div>
        )
    }
    const updateMyPresence = useUpdateMyPresence();
    const { day, date, ListDestination, conclusionDay }: DayTrips = layer
    return (
        <div id={`Day${day}`}>
            {/* Header */}
            <div className=" flex justify-between items-center w-full">
                <div className="flex gap-x-4 items-center">
                    <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium self-start css-9lpudm bg-slate-100 rounded-sm p-1" type="button"
                        onClick={() => setIsOpenTrip(!isOpenTrip)}>
                        <span>
                            <ChevronDown className={`transform transition-transform duration-500 ${isOpenTrip ? 'rotate-180' : 'rotate-0'}`} />
                        </span>
                    </button>
                    <h3 className=" font-bold">{day}</h3>
                </div>
                <div className=" flex">
                    <InputDate date={date} />
                    <MoreAction lable="Delete Date" deleteHandle={DeleteDatePlan(id)} typeAction="Date" index={id} />
                </div>
            </div>

            <div ref={contentRef}
                className={` overflow-hidden w-full  mt-5  rounded-md font-light transition-all duration-500 ease-in-out 
                   relative ${isOpenTrip ? ' max-h-full opacity-100 ' : 'max-h-0  opacity-0'}
                    `}
                onFocus={(e) => {
                    console.log(e.target.id)
                    updateMyPresence({ focusedId: e.target.id })
                }}
            >
                <div className=" relative">
                <textarea className=" w-full placeholder:text-gray-400   text-sm px-3 py-3 rounded-md 
                 hover:bg-slate-200 hover:outline-gray-500 focus: outline-gray-500 transition-all duration-500 ease-in-out  "
                    value={conclusionDay}
                    rows={2}
                    placeholder="Add description of the day"
                    id="day-Description"
                />
                    <Selections id="day-Description" coverImg={ false} />
                </div>
                <div className=" mt-2">
                    {
                        ListDestination?.map((destination, index) => {
                            return (
                                <DestinationPlan
                                    key={index}
                                    id={id}
                                    place={destination.place}
                                    noteList={destination.noteList}
                                    planIndex={index}
                                    deletePlace={DeltePlace}
                                />
                            )
                        })
                    }
                    {/* empty Destination */}
                </div>
            </div>
            <div className=" w-full ">
                <div className={` flex gap-2 items-center   transition-all duration-500 ease-in-out mb-4
                    ${isOpenTrip ? ' max-h-screen opacity-100 ' : 'max-h-0 opacity-0'} `} ref={contentRef}
                >
                    <MapPin fill="#DEDFE4" size={40} stroke="#fff" />
                    <AddTripInput dayId={id} listDestination={ListDestination} />
                </div>
            </div>
        </div>
    )
}

export default TripPlanPreview