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
import LoadingComponent from "@/src/components/UI/Loading"





interface TripPreviewProps {
    key: string,
    id: string,
    dayIndex : number
}
const TripPlanPreview = ({ key, id, dayIndex}: TripPreviewProps) => {
    const layer = useStorage((storage) => storage.layers.get(id))

    const AddDestination = useMutation((
        { storage },
        destination: Destination[]
    ) => {
        const layer = storage.get("layers")
        const dayTrips = layer.get(id)?.set("ListDestination", destination)
    }, [])

    const DeleteDatePlan = useMutation((
        { storage },
        id: string
    ) => {
        const layerIds = storage.get("layerIds")
        const layers = storage.get("layers")
        const index = layerIds.findIndex(item => item === id)
        const daylayerId = layerIds.delete(index)
        const daylayer = layers.delete(id)
    }, [])


    const DeltePlace = useMutation((
        { storage },
        index: number,
    ) => {
        const layer = storage.get("layers").get(id)
        const markLayer = storage.get("layers").get("GoogleMark")
        const listMark = markLayer?.get("ListMark")
        const { ListDestination } = layer?.toObject()
        console.log("ListDes", ListDestination)
        let newListDestiantion;
        const placeName  =  ListDestination[index].place
        const newListMark = listMark.filter((mark) => mark.key !== placeName)
        console.log({placeName})
        // ลบตัวท้ายสุด 
        if (index + 1 === ListDestination.lenght) {
            newListDestiantion = ListDestination.slice(0, index)
        } else {
            newListDestiantion = [...ListDestination.slice(0, index), ...ListDestination.slice(index + 1)]
        }
        layer?.set("ListDestination", newListDestiantion)
        markLayer?.set("ListMark" , newListMark)
    }, [])

    const updateTitleOfDay = useMutation((
        {storage},
        newTitle : string
    ) => {
        const layer = storage.get("layers").get(id)
        layer?.set("title" , newTitle);
    },[])
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

    const handleDeletePlanHandle = (id: string) => {
        DeleteDatePlan(id)
    }

    const [isOpenTrip, setIsOpenTrip] = useState(true);
    const contentRef = useRef(null)
    // อยาก return skeleton ไปก่อน
    const updateMyPresence = useUpdateMyPresence();
    if (!layer) {
        return (
           <LoadingComponent/>
        )
    }
    const { day, date, ListDestination, title}: DayTrips = layer
    return (
        <div id={`Day${day}`}  >
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
                    <MoreAction lable="Delete Date" deleteHandle={DeleteDatePlan} typeAction="Date" index={id} />
                </div>
            </div>

            <div ref={contentRef}
                className={`  w-full  mt-5  rounded-md font-light transition-all duration-500 ease-in-out 
                   relative ${isOpenTrip ? ' max-h-full opacity-100 ' : 'max-h-0  opacity-0'}
                    `}
                onFocus={(e) => {
                    updateMyPresence({ focusedId: e.target.id })         
                }}
                onBlur={(e) => updateMyPresence({ focusedId: null})}
            >
                <div className=" relative  ">
                <textarea className=" w-full placeholder:text-gray-400   text-sm px-3 py-3 rounded-md 
                 hover:bg-slate-200 hover:outline-gray-500  transition-all duration-500 ease-in-out  "
                    value={title}
                    rows={2}
                    onChange={(e) => updateTitleOfDay(e.target.value)}
                    placeholder="Add description of the day"
                    id={`day-Description${day}`}
                >
                  
                </textarea>
                <Selections id={`day-Description${day}`} coverImg={ false} />
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
                    <AddTripInput dayId={id} listDestination={ListDestination} dayIndex = {dayIndex} />
                </div>
            </div>
        </div>
    )
}

export default TripPlanPreview