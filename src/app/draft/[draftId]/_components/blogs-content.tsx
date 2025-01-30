import { GetBlogMongoDb } from "@/src/lib/backend/liveblock"
import { PreviewGallery } from "../_planTripComponent/Gallery/gallery-preview"
import { Description } from "./blogs-content-description"
import { CoverImage } from "./cover-img"
import { ExpensePreview } from "./expense-preview"
import TripPlan from "./trip-plan"
import { Button } from "@/src/components/UI/Button"
import { useCanRedo, useCanUndo, useHistory, useMutation, useMyPresence, useOthers, useOthersMapped, useUpdateMyPresence } from "@liveblocks/react"
import { useMemo } from "react"
import { connectionIdToColor } from "@/src/lib/utils"
import Cursor from "./Cursor"
import Selection from "./Selection"



interface BlogContentProps {
    imgUrl: string,
    blogId: string,
    stDate: string
}

const getBlog = async (blogId: string) => {
    console.log(blogId)
    const res = await GetBlogMongoDb(blogId)
    console.log(res.blog)
}
export const BlogContent = ({ blogId, stDate, imgUrl }: BlogContentProps) => {

    const updateMyPresence = useUpdateMyPresence();

    return (
        <main className=" w-full ">
            <CoverImage blogId={blogId} imgUrl={imgUrl} />
            <Description />
            <TripPlan startDate={stDate} />
            <ExpensePreview />
            <PreviewGallery />
            <Button onClick={() => getBlog(blogId)}>
                GetPlan
            </Button>
        </main>
    )
}

