"use client"

import { useMutation } from "@liveblocks/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { CarFront, Footprints, Plane, TrainFront } from "lucide-react"
import { Selections } from "../_components/Selection"


interface TransportNoteProps {
    planId : string
    transportType: number
    describtion: string
    planIndex : number
    noteListIndex :number
    updateMyPresence: (patch: Partial<{ focusedId: string | null }>, options?: { addToHistory: boolean }) => void;
}

export const TransportNote = ({ planId,transportType, describtion ,planIndex , noteListIndex,updateMyPresence}: TransportNoteProps) => {
    const ListIcon = [
    <Footprints strokeWidth={1.5} color="#051094" key={"Footprints"}  />, 
    <CarFront strokeWidth={1.5} color="#051094"  key={"CarFront"}/>, 
    <TrainFront strokeWidth={1.5} color="#051094" key={"TrainFront"} />, 
    <Plane strokeWidth={1.5} color="#051094"  key={"Plane"} />]

    const updateIcon = useMutation((
        {storage},
        iconIndex : number
    ) => {
        const layers = storage.get("layers")
        const layer = layers.get(planId)
        const listDestination = layer?.get("ListDestination")
        const {noteList} = listDestination[planIndex]
        noteList[noteListIndex].transportType = iconIndex

        layer?.set("ListDestination" , listDestination)
    },[])
    return (
        <div className=" w-full flex items-center gap-x-4 pl-6 relative
        ">
            <DropdownMenu>
                <DropdownMenuTrigger className=" flex items-center " 
                    onFocus={(e) =>  {
                        console.log(e.target)
                        updateMyPresence({focusedId:e.target.id})
                    }}
                     id={`transportNote${planId}${noteListIndex}`}
                     onBlur={(e) =>updateMyPresence({focusedId:null})}
                   >
                    <TransportIcon iconNumber={transportType}  />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" sideOffset={3} >
                    <DropdownMenuItem className=" flex items-center border-dashed border gap-x-2 bg-white p-1 rounded-md outline-none border-[#051094]  "
                        >
                        {
                            ListIcon.map((Icon: JSX.Element, index: number) => {
                                return (
                                    <button 
                                    key={Icon.key}
                                    className= { ` bg-blue-100 rounded-md p-1  ${index ===transportType ? ' border-yellow-400 border-2' : ''}`}
                                    onClick={() => updateIcon(index)}
                                    >
                                        {Icon}
                                    </button>
                                )
                            })
                        }
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <p className=" text-sm  font-light">{describtion}</p>
            <Selections id={`transportNote${planId}${noteListIndex}`}/>
        </div>
    )
}

interface TransportIconProps {
    iconNumber: number;
}


const TransportIcon = ({ iconNumber }: TransportIconProps) => {
    switch (iconNumber) {
        case 0:
            return (
                <button className=" bg-blue-100  rounded-md p-1 border-[#051094] border">
                    <Footprints  strokeWidth={1.5} color="#051094" />
                </button>
            )
        case 1:
            return (
                <button className=" bg-blue-100  rounded-md p-1 border-[#051094] border">
                    <CarFront strokeWidth={1.5} color="#051094" />
                </button>
            )
        case 2:
            return (
                <button className=" bg-blue-100  rounded-md p-1 border-[#051094] border">
                    <TrainFront strokeWidth={1.5} color="#051094"/>
                </button>
            )
        case 3:
            return (
                <button className=" bg-blue-100  rounded-md p-1 border-[#051094] border">
                    <Plane strokeWidth={1.5} color="#051094" />
                </button>
            )
    }
}