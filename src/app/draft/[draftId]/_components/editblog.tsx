"use client"

import { BlogContent } from "./blogs-content"

interface EditBlogProps {
    coverImg : string ,
    blogId : string,
    stDate : string,
}

export const EditBlog = ({
coverImg,
blogId,
stDate
}:EditBlogProps) =>{
    return(
        <main className=" flex w-full h-[calc(100vh)]">
            <div className=" w-full lg:w-2/3 flex md:w-full border-r-2 border-[#F4F8FB]  overflow-y-auto">
                <BlogContent imgUrl={coverImg} blogId={blogId} stDate={stDate}/>
            </div>
            <div className=" hidden  lg:w-1/3 lg:flex justify-center h-full items-center ">
                <img src="/map2.webp" className=" w-full  h-[calc(100vh)]
                "/>
            </div>
        </main>
    )
}