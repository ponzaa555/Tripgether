"use client"

import { BlogContent } from "./blogs-content"

interface EditBlogProps {
    coverImg? : string,
    blogId : string
}

export const EditBlog = ({
coverImg,
blogId
}:EditBlogProps) =>{
    return(
        <main className=" flex w-full h-[calc(100vh-60px)]">
            <div className=" w-full sm:w-2/3 flex  border-r-2 border-[#F4F8FB]  overflow-y-auto">
                <BlogContent imgUrl={coverImg} blogId={blogId}/>
            </div>
            <div className=" hidden w-1/3 sm:flex justify-center h-full items-center ">
                Map
            </div>
        </main>
    )
}