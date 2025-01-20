import { Description } from "./blogs-content-description"
import { CoverImage } from "./cover-img"



interface BlogContentProps {
    imgUrl?: string,
    blogId : string,
}

export const BlogContent = ({ imgUrl  , blogId}: BlogContentProps) => {
    return (
        <main className=" w-full ">
            <CoverImage imgUrl={imgUrl}  blogId={blogId} />
            <Description/>
            <div className=" flex bg-green-600 w-full h-[500px] items-center justify-center text-white text-xl"> Trip Plan</div>
            <div className=" flex bg-blue-500 w-full h-[500px] items-center justify-center text-white text-xl"> Expense</div>
            <div className=" flex bg-gray-400 w-full h-[500px] items-center justify-center text-white text-xl">My Gallery</div>
        </main>
    )
}