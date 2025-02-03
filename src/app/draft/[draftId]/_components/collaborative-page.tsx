"use client";
import { useMutation, useOthers } from "@liveblocks/react"
import { EditBlog } from "./editblog"
import { Navbar } from "./navbar"
import { SideBar } from "./side-bar"
import { useMutationState } from "@/src/hooks/useMutation";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { BlogDb, draftDb, PlanTrip, TripContentType } from "@/src/models/components/Blog";
import LoadingComponent from "@/src/components/UI/Loading";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid"

interface CollaborativeProps {
    liveBlockId: string
    userId : string
}

export const CollaborativePage = ({ liveBlockId , userId}: CollaborativeProps) => {
    const { mutate, pending } = useMutationState(api.draft.queryDraftByRoomId);
    const [draftInfo, setdraftInfo] = useState<draftDb>();
    // แก้ให้เรียกครั้งเดียว
    useEffect(() => {
        console.log({liveBlockId})
        const blogsInfo = mutate(
            {
                liveBlockId: liveBlockId
            }).then((draft) => {
                console.log({draft})
                const draftMap: draftDb = {
                    id : draft._id,
                    member: draft.memberId,
                    blogName: draft.blogName,
                    endDate: draft.endDate,
                    coverImgUrl: draft.coverImgUrl,
                    stDate: draft.stDate,
                    liveBlockId: draft.liveBlockId
                }
                setdraftInfo(draftMap)
                console.log({draftInfo})
            }).catch(() => {
                console.log("Error get blog by blogId")
            })
        // add Description
    }, [])
    console.log({ draftInfo});
    if (!draftInfo) {
        return (
            <LoadingComponent />
        )
    }
    return (
        <main>
            <Navbar blogName={draftInfo!.blogName} startDate={draftInfo!.stDate} endDate={draftInfo!.endDate} blogId={draftInfo.liveBlockId} authorId = {userId}/>
            <div className=" flex">
                {/* side Bar */}
                <SideBar />
                {/* Blogs Plan  */}
                {/* Map */}
                <EditBlog blogId={draftInfo.liveBlockId} coverImg={draftInfo.coverImgUrl} stDate={draftInfo.stDate} endDate={draftInfo.endDate} draftId={draftInfo.id}/>
            </div>
            {/* <div>There are {userCount} other user(s) online</div>;  */}
        </main>
    )
}