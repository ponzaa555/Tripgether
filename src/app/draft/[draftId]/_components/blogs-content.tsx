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
    endDate: string
}

const getBlog = async (blogId: string) => {
    console.log(blogId)
    const res = await GetBlogMongoDb(blogId)
}
export const BlogContent = ({ blogId, stDate, imgUrl, endDate }: BlogContentProps) => {

    const updateMyPresence = useUpdateMyPresence();

    return (
        <main className=" w-full ">
            <CoverImage blogId={blogId} imgUrl={imgUrl} />
            <Description />
            <TripPlan startDate={stDate} endDate={endDate} />
            <ExpensePreview />
            <PreviewGallery />
            <div>
                <Button
                    onClick={() => getBlog(blogId)}>
                    GetBLog
                </Button>
            </div>
        </main>
    )
}

