"use client"

import { Hint } from "@/src/components/hint"
import { ChevronDown, CircleX, SmilePlus } from "lucide-react"
import { UserAvatar } from "./user-avartar"
import { useMutation, useOthers, useSelf, useStorage } from "@liveblocks/react"
import React, { useEffect, useRef, useState } from "react"
import LoadingComponent from "@/src/components/UI/Loading"
import { ListHastag } from "@/src/models/components/Blog"



interface LiveTextAreaProps {

}

const LiveTextArea = ({ }: LiveTextAreaProps) => {

    const updateDescribtion = useMutation((
        { storage },
        newDescribtion: string
    ) => {
        const layer = storage.get("layers")
        const content = layer.get("Describtion")?.set("describtion", newDescribtion)
        console.log(content)
    }, [])

    const updateHastagList = useMutation((
        { storage },
        newHastag: string[]
    ) => {
        const layer = storage.get("layers")
        const hastagList = layer.get("Hastag")?.set("HastagList", newHastag)
    }, [])

    const selectHastagDropdown = (hastag:string) => {
        const newListHastag = [...HastagList , hastag ]
        updateHastagList(newListHastag);
        setIsHastagDropDown(false)
    }
    const deleteHastagDropdown = (hastagIndex : number) => {
        let newListHastag = []
        // ลบตัวท้าย
        if(hastagIndex+1 === HastagList.length){
            newListHastag = HastagList.splice(0,hastagIndex)
        }else{            
            newListHastag = [...HastagList.slice(0,hastagIndex) , ...HastagList.slice(hastagIndex +1 , HastagList.length)]
        }
        updateHastagList(newListHastag);
    }
    const filterHastag = (e:React.ChangeEvent<HTMLInputElement>) => {
        setHastagDropDown(ListHastag.filter(hastag => hastag.toLowerCase().includes(e.target.value.toLocaleLowerCase())))
    }

    const handleClickOutside = (event : React.MouseEvent) => {
        // Check if the click is outside the dropdown component
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsHastagDropDown(false); // Close dropdown
        }
      };



    const [descriptionopen, setDescriptionOpen] = useState(false)
    const [isHastag, setIsHastag] = useState(false)
    const [hastagDropDown , setHastagDropDown] = useState(ListHastag)
    const [isHastagDropDown, setIsHastagDropDown] = useState(false);

    const users = useOthers()
    const currentUser = useSelf();
    const contentRef = useRef(null);
    const dropdownRef = useRef(null);

    const content = useStorage((content) => content.layers.get("Describtion"))
    const listHastag = useStorage((hastag) => hastag.layers.get("Hastag"))
    


    useEffect(() => {
        // Add event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Cleanup event listener on component unmount
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    if (!content) {
        return (
            <div className=" flex justify-center items-center">
                <LoadingComponent />
            </div>
        )
    }
    const { type, describtion } = content
    const { HastagList } = listHastag

    return (
        <div >
            <div className=" flex justify-between">
                <div className="flex gap-2 items-center">
                    <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium self-start css-9lpudm bg-slate-100 rounded-sm p-1" type="button"
                        onClick={() => setDescriptionOpen(!descriptionopen)}>
                        <span>
                            <ChevronDown className={`transform transition-transform duration-500 ${descriptionopen ? 'rotate-180' : 'rotate-0'}`} />
                        </span>
                    </button>
                    <h3>Description</h3>
                </div>
                <div className="flex items-center">
                    <div className=" flex gap-2">
                        {users.map(({ connectionId, info }) => {
                            return (
                                <UserAvatar
                                    key={connectionId}
                                    src={info.picture}
                                    name={info.name}
                                    fallback={info?.name?.[0] || "T"}
                                />
                            )
                        })}
                    </div>
                    {currentUser && (
                        <UserAvatar
                            key={currentUser.info.name}
                            src={currentUser.info.picture}
                            name={currentUser.info.name}
                            fallback={currentUser.info?.name?.[0]} />
                    )}
                    <div className=" flex ml-2 gap-2 items-center">
                        <Hint label="Invite friend" sideOffset={5}>
                            <button className=" flex gap-2 items-center">
                                <SmilePlus className=" h-8 w-8" />
                                <h3>invite</h3>
                            </button>
                        </Hint>
                    </div>
                </div>
            </div>
            <div >
                <div
                    ref={contentRef}
                    className={` overflow-hidden  w-full  bg-gray-50 mt-10  rounded-md font-light transition-all duration-500 ease-in-out ${descriptionopen ? ' max-h-full ' : ' max-h-0'}`}
                    // style={{ height: descriptionopen ? `${contentRef?.current?.scrollHeight}px` : '0' }}
                    >
                    {/* <div className=" p-4">
                        <span>Normal</span>
                        <span> B</span>
                        <span> I</span>
                        <span> U</span>
                    </div> */}
                    <textarea
                        className=" bg-transparent w-full text-sm  outline-none pl-4"
                        rows={8}
                        placeholder="What's on your mind?"
                        value={describtion}
                        onChange={(e) => updateDescribtion(e.target.value)}
                    />
                </div>
            </div>
            <div className=" w-full  mt-5 ">
                {/* map Hastage Selection */}
                {/* TODO Responsive */}
                <div className=" flex w-full relative">
                    <div className="  flex  gap-x-1 ">
                        {HastagList.map((content : string , index : number) => {
                            return (
                                <div className=" flex bg-teal-100 rounded-full px-3 text-xs items-center font-light  "
                                    key={content}>
                                    <span>{content}</span>
                                    <button className=" ml-2 " onClick={() => deleteHastagDropdown(index)}><CircleX width={15} height={15} fill="#000" stroke="#ffff" /></button>
                                </div>
                            )
                        })}
                    </div >
                    <div className=" relative">
                        <div className="relative text-[#646B7D] text-[14px]">
                            <input className={`focus:outline-0 w-[200px] ${HastagList.length === 5 ? "hidden" : "block"}`} 
                            placeholder="Add #hashtag" 
                            onClick={() => setIsHastagDropDown(!isHastagDropDown)} 
                            onChange={(e) => filterHastag(e)}/>
                        </div>
                        { isHastagDropDown && (
                            <ul className="max-h-60 absolute bg-white overflow-y-auto z-10 mt-1 shadow border rounded-md w-[200px] py-1" ref={dropdownRef}>
                                {hastagDropDown.map((hastage) => {
                                    return(
                                        <li className="flex gap-2 items-center text-sm font-medium py-2 px-4 duration-300 hover:bg-gray-100 cursor-pointer Mui-focused"
                                            key={hastage}
                                        onClick={(e) => selectHastagDropdown(e.currentTarget.innerText)}>
                                            {hastage}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>
                    <p className="  ml-2 absolute items-center text-wrap right-0 font-bold text-sm bottom-2 text-orange-400"> {HastagList.length} / 5</p>
                </div>
                <hr className=" border-gray-100 w-full border-1 mt-2" />
            </div>
        </div>
    )
}

export default LiveTextArea


