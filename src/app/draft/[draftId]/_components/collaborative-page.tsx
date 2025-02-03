"use client";
import { useMutation, useOthers } from "@liveblocks/react"
import { EditBlog } from "./editblog"
import { Navbar } from "./navbar"
import { SideBar } from "./side-bar"
import { useMutationState } from "@/src/hooks/useMutation";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { BlogDb, PlanTrip, TripContentType } from "@/src/models/components/Blog";
import LoadingComponent from "@/src/components/UI/Loading";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid"

interface CollaborativeProps {
    blogId: string
}

export const CollaborativePage = ({ blogId }: CollaborativeProps) => {

    const { mutate, pending } = useMutationState(api.blog.getById);
    const [blogInfo, setBlogInfo] = useState<BlogDb>();
    // แก้ให้เรียกครั้งเดียว
    useEffect(() => {
        console.log(blogId)
        const blogsInfo = mutate({
            blogId: blogId
        }).then((blog) => {
            const blogMap : BlogDb = {
                authorId : blog.authorId,
                blogName: blog.blogName,
                endDate: blog.endDate,
                coverImgUrl: blog.coverImgUrl,
                stDate : blog.stDate,
                teamMate: blog.teamMate,
                roomId : blog.roomId
            }
            setBlogInfo(blogMap)
        }).catch(() => {
            console.log("Error get blog by blogId")
        })
        // add Description
    },[])
    console.log({ blogInfo });
    if(!blogInfo){
        return(
            <LoadingComponent/>
        )
    }
    return (
        <main>
            <Navbar blogName={blogInfo!.blogName} startDate={blogInfo!.stDate} endDate={blogInfo!.endDate} blogId={blogId}  />
            <div className=" flex">
                {/* side Bar */}
                <SideBar />
                {/* Blogs Plan  */}
                {/* Map */}
                <EditBlog blogId={blogId} coverImg={blogInfo.coverImgUrl} stDate={blogInfo.stDate} endDate={blogInfo.endDate} />
            </div>
            {/* <div>There are {userCount} other user(s) online</div>;  */}
        </main>
    )
}