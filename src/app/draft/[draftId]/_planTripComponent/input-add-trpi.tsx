"use client"

import MyDialog from "@/src/components/UI/MyDialog"
import { CountryName } from "@/src/lib/frontend/mock-input-add-plan"
import { ColorMark, Destination, Poi, TripContentType } from "@/src/models/components/Blog"
import { useMutation, useUpdateMyPresence } from "@liveblocks/react"
import { ChevronDown, Map, X } from "lucide-react"
import React, { useState } from "react"
import { Selections } from "../_components/Selection"
import { Button } from "@/src/components/UI/Button"

interface AddDestinationProps {
    dayId: string,
    listDestination: Destination[],
    dayIndex : number
}


export const AddTripInput = ({ listDestination, dayId ,dayIndex}: AddDestinationProps) => {
    const [cleanInput, setCleanInput] = useState(false)
    const [inputValue, setInputValue] = useState<string>();
    const [fillter, setFillter] = useState(CountryName)
    const updateMyPresence = useUpdateMyPresence()
    const inputValuehandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const filterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFillter(CountryName.filter(Country => Country.key.toLowerCase().includes(e.target.value.toLocaleLowerCase())))
    }
    const AddDestination = useMutation((
        { storage },
        destination: Destination[]
    ) => {
        const layer = storage.get("layers")
        const dayTrips = layer.get(dayId)?.set("ListDestination", destination)
    }, [])
    const AddMark = useMutation((
        {storage},
        mark:{key : string , location : { lat : number , lng : number}}
    ) => {
        const layers = storage.get("layers")
        const googleMarkLayer = layers.get("GoogleMark")
        let ListMark = googleMarkLayer?.get("ListMark")
        console.log({googleMarkLayer})
        console.log({ListMark})
        const newMark : Poi = {
            key : mark.key,
            location : mark.location,
            color : ColorMark[dayIndex]
        }
        if(ListMark.length === 0){
            googleMarkLayer?.set("ListMark",[newMark])
        }else{
            googleMarkLayer?.set("ListMark",[...ListMark,newMark])
        }
    },[])
    const handleAddDestination = (mark : {key : string , location : { lat : number , lng : number}}) => {
        const destination: Destination = {
            type: TripContentType.Destination,
            order: listDestination == null ? 1 : listDestination.length+1,
            place: mark.key,
            noteList: []
        }
        let newDayTrips;
        if (listDestination === undefined) {
            newDayTrips = [destination]
        } else {
            newDayTrips = [...listDestination, destination]
        }
        AddDestination(newDayTrips)
        AddMark(mark)
    }
    return (
        <div className="w-full relative">
            <div className=" w-full bg-[#F4F8FB] flex justify-between rounded-md p-2 text-sm items-center"
            onFocus={(e) => updateMyPresence({focusedId : e.target.id})}
            onBlur={(e) => updateMyPresence({focusedId:null})}>
                <input
                    className=" w-full flex-grow-0 bg-transparent outline-none text-sm"
                    placeholder="Add place"
                    onFocus={() => setCleanInput(true)}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        filterInput(e)
                        }
                    }
                    id={`addtrip${dayId}`}
                />
                <div className=" flex items-center">
                    <div className=" flex items-center mr-5 gap-x-1">
                        <X size={15} stroke="#828388"
                            className={`${cleanInput ? " block" : "hidden"} cursor-pointer`}
                            onClick={() => setInputValue("")} />
                        <ChevronDown size={15} className=" cursor-pointer" />
                    </div>
                    <Map size={25} stroke="#828388" fill="#ffff" className=" bg-white p-1 rounded-md cursor-pointer" />
                </div>
            </div>
            {
                // cursor เลื่อนลง click outside close drop down
                inputValue && (
                    <ul className="max-h-60 absolute  bg-white overflow-y-auto z-30 mt-1 shadow border rounded-md w-[70%] py-1" >
                        {fillter.slice(1, 5).map((country) => {
                            return (
                                <li className="flex gap-2 items-center text-sm font-medium py-2 px-4 duration-300 hover:bg-gray-100 cursor-pointer Mui-focused"
                                    onClick={(e) => {
                                        setInputValue("")
                                        handleAddDestination(country)
                                    }}
                                    key={country.key}>
                                    {country.key}
                                </li>
                            )
                        })}
                    </ul>
                )
            }
            <Selections id={`addtrip${dayId}`}/>
            {/* <Button onClick={() => AddMark()}>
                Google Mark
            </Button> */}
        </div>
    )
}