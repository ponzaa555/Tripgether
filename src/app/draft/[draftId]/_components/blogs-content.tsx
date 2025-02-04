import { GetBlogMongoDb } from "@/src/lib/backend/liveblock"
import { PreviewGallery } from "../_planTripComponent/Gallery/gallery-preview"
import { Description } from "./blogs-content-description"
import { CoverImage } from "./cover-img"
import { ExpensePreview } from "./expense-preview"
import TripPlan from "./trip-plan"
import { Button } from "@/src/components/UI/Button"
import { useUpdateMyPresence } from "@liveblocks/react"




interface BlogContentProps {
    imgUrl: string,
    blogId: string,
    stDate: string,
    endDate: string,
    draftId : string
}

// const getBlog = async (blogId: string) => {
//     console.log(blogId)
//     const res = await GetBlogMongoDb(blogId)

// }

export const BlogContent = ({ blogId, stDate, imgUrl, endDate , draftId }: BlogContentProps) => {

    const updateMyPresence = useUpdateMyPresence();

    return (
        <main className=" w-full ">
            <CoverImage blogId={blogId} imgUrl={imgUrl} draftId={draftId}/>
            <Description draftId={draftId} blogId={blogId}/>
            <TripPlan startDate={stDate} endDate={endDate} />
            <ExpensePreview />
            <PreviewGallery />
        </main>
    )
}

