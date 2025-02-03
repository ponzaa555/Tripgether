"use client"

import GoogleMapComponent from "@/src/components/GoogleMapComponent"
import { BlogContent } from "./blogs-content"

interface EditBlogProps {
    coverImg : string ,
    blogId : string,
    stDate : string,
    endDate : string,
    draftId : string
}

export const EditBlog = ({
coverImg,
blogId,
stDate,
endDate,
draftId
}:EditBlogProps) =>{
    return(
        <main className=" flex w-full h-[calc(100vh)]">
            <div className=" w-full lg:w-2/3 flex md:w-full border-r-2 border-[#F4F8FB]  overflow-y-auto">
                <BlogContent imgUrl={coverImg} blogId={blogId} stDate={stDate} endDate={endDate} draftId={draftId}/>
            </div>
            <div className=" hidden  lg:w-1/3 lg:flex justify-center h-full items-center ">
                <GoogleMapComponent/>
            </div>
        </main>
    )
}