import { Button } from "@/src/components/UI/Button"
import { LiveObject } from "@liveblocks/client";
import { useMutation, useStorage } from "@liveblocks/react"
import { nanoid } from "nanoid"
import TripPlanPreview from "../_planTripComponent/trip-preview";
import { addDays, format, parse } from "date-fns";


interface TripPlanProps {
    startDate: string
    endDate : string
}



const TripPlan = ({ startDate  , endDate}: TripPlanProps) => {

    // get layer from database
    
    const layerIds = useStorage((root) => root.layerIds)?.slice(4,);
    const addDateToStorage = useMutation((
        { storage }
    ) => {
        const id = nanoid();
        const layers =  storage.get("layers")
        const layerIds = storage.get("layerIds")
        // ไม่มีวันเี่ยวเลย
        let newDateString;
        if (layerIds.length === 4) {
            newDateString = startDate
        } else {
            const lastId = layerIds.toArray()[layerIds.length - 1]
            const data = layers.get(lastId)?.toObject()
            console.log({data})
            const { date } = data
            const datetime = parse(date, "yyyy-mm-dd", new Date())
            const newDate = addDays(datetime, 1)
            newDateString = format(newDate, "yyyy-mm-dd")
        }

        const layer = new LiveObject({
            day: `Day${layerIds.length - 4 + 1}`,
            date: newDateString,
            ListDestination: [],
            conclusionDay: undefined,
        })


            layerIds.push(id)
            layers.set(id, layer)
    },[])
    return (
        <div className=" py-10 rounded-none mobile:px-4  px-[5.7rem] relative ">
            {
                layerIds?.map((layerId) => {
                    return (
                        <TripPlanPreview
                            key={layerId}
                            id={layerId} />
                    )
                })
            }
            <Button
                className=" mt-10"
                size="default"
                onClick={() => addDateToStorage()}>
                Add Date
            </Button>
        </div>
    )
}

export default TripPlan