"use client"

import MyDialog from "@/src/components/UI/MyDialog"
import { CountryName } from "@/src/lib/frontend/mock-input-add-plan"
import { Destination, TripContentType } from "@/src/models/components/Blog"
import { useMutation, useUpdateMyPresence } from "@liveblocks/react"
import { ChevronDown, Map, X } from "lucide-react"
import React, { useState } from "react"
import { Selections } from "../_components/Selection"

interface AddDestinationProps {
    dayId: string,
    listDestination: Destination[]
}


export const AddTripInput = ({ listDestination, dayId }: AddDestinationProps) => {
    const [cleanInput, setCleanInput] = useState(false)
    const [inputValue, setInputValue] = useState<string>();
    const [fillter, setFillter] = useState(CountryName)
    const updateMyPresence = useUpdateMyPresence()
    const inputValuehandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const filterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFillter(CountryName.filter(Country => Country.toLowerCase().includes(e.target.value.toLocaleLowerCase())))
    }
    const AddDestination = useMutation((
        { storage },
        destination: Destination[]
    ) => {
        const layer = storage.get("layers")
        const dayTrips = layer.get(dayId)?.set("ListDestination", destination)
    }, [])

    const handleAddDestination = (place: string) => {
        const destination: Destination = {
            type: TripContentType.Destination,
            order: listDestination == null ? 1 : listDestination.length+1,
            place: place,
            noteList: []
        }
        let newDayTrips;
        if (listDestination === undefined) {
            newDayTrips = [destination]
        } else {
            newDayTrips = [...listDestination, destination]
        }
        AddDestination(newDayTrips)
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
                                    key={country}>
                                    {country}
                                </li>
                            )
                        })}
                    </ul>
                )
            }
            <Selections id={`addtrip${dayId}`}/>
        </div>
    )
}