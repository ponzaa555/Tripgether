"use client"

import { Hint } from "@/src/components/hint"
import { ChevronDown, SmilePlus } from "lucide-react"
import { UserAvatar } from "./user-avartar"
import { useMutation, useOthers, useSelf, useStorage } from "@liveblocks/react"
import { useRef, useState } from "react"
import LoadingComponent from "@/src/components/UI/Loading"


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
        {storage},
        newHastag : string[]
    ) => {
        const layer = storage.get("layers")
        const hastagList = layer.get("Hastag")?.set("HastagList",newHastag)
    },[])
    const users = useOthers()
    const currentUser = useSelf();
    const contentRef = useRef(null);
    const [descriptionopen, setDescriptionOpen] = useState(false)
    const content = useStorage((content) => content.layers.get("Describtion"))
    const listHastag = useStorage((hastag) => hastag.layers.get("Hastag"))
    if (!content) {
        return (
            <LoadingComponent />
        )
    }
    const { type, describtion } = content
    const { HastagList} = listHastag

    return (
        <div className=" overflow-hidden">
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
                    className={` w-full  bg-gray-50 mt-10  rounded-md font-light transition-all duration-500 ease-in-out ${descriptionopen ? 'h-auto ' : 'h-0'}`}
                    style={{ height: descriptionopen ? `${contentRef?.current?.scrollHeight}px` : '0' }}>
                    <div className=" p-4" >
                        <span>Normal</span>
                        <span> B</span>
                        <span> I</span>
                        <span> U</span>
                    </div>
                    <textarea
                        className=" bg-transparent w-full text-sm mt-4 outline-none pl-4"
                        rows={8}
                        placeholder="What's on your mind?"
                        value={describtion}
                        onChange={(e) => updateDescribtion(e.target.value)}
                    />
                </div>
            </div>
            <div className=" w-full  mt-5">
                <div className=" w-full">
                    <input type="text" className=" outline-none p-1 text-gray-200 font-extralight" placeholder="Add #hastag" />
                </div>
                <hr className=" border-gray-100 w-full border-1" />
            </div>
        </div>
    )
}

export default LiveTextArea


