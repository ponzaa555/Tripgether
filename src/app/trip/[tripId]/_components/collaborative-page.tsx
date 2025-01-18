"use client";
import { useOthers } from "@liveblocks/react"
import { EditBlog } from "./editblog"
import { Navbar } from "./navbar"
import { SideBar } from "./side-bar"
import { useMutationState } from "@/src/hooks/useMutation";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { BlogDb } from "@/src/models/components/Blog";
import LoadingComponent from "@/src/components/UI/Loading";

interface CollaborativeProps {
    blogId: string
}

export const CollaborativePage = ({ blogId }: CollaborativeProps) => {

    const { mutate, pending } = useMutationState(api.blog.getById);
    const [blogInfo, setBlogInfo] = useState<BlogDb>();
    useEffect(() => {
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
            }
            setBlogInfo(blogMap)
        }).catch(() => {
            console.log("Error get blog by blogId")
        })
    }, [mutate])
    console.log({ blogInfo });
    if(!blogInfo){
        return(
            <LoadingComponent/>
        )
    }
    return (
        <main>
            <Navbar blogName={blogInfo!.blogName} startDate={blogInfo!.stDate} endDate={blogInfo!.endDate}  />
            <div className=" flex">
                {/* side Bar */}
                <SideBar />
                {/* Blogs Plan  */}
                {/* Map */}
                <EditBlog blogId={blogId} coverImg={blogInfo.coverImgUrl}/>
            </div>
            {/* <div>There are {userCount} other user(s) online</div>;  */}
        </main>
    )
}