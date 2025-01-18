
import { Room } from "@/src/components/room"
import { EditBlog } from "./_components/editblog"
import { Navbar } from "./_components/navbar"
import { SideBar } from "./_components/side-bar"
import LoadingComponent from "@/src/components/UI/Loading"
import { CollaborativePage } from "./_components/collaborative-page"
import { useMutationState } from "@/src/hooks/useMutation"
import { api } from "@/convex/_generated/api"
interface BlogIdPageProps {
    params: {
        tripId: string
    }
}
const BlogIdPage = ({ params }: BlogIdPageProps) => {
    return (
        <Room roomId= {params.tripId} fallback ={<LoadingComponent/>}>
            <CollaborativePage blogId={params.tripId}/>
        </Room>
    )
}

export default BlogIdPage