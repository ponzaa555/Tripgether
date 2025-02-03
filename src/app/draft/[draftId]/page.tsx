
import { Room } from "@/src/components/room"

import LoadingComponent from "@/src/components/UI/Loading"
import { CollaborativePage } from "./_components/collaborative-page"

import { getServerSession } from "next-auth"
import authOption from "@/src/lib/backend/authOption"
interface BlogIdPageProps {
    params: {
        draftId: string
    }
}
const BlogIdPage = async({ params }: BlogIdPageProps) => {
    const user = await getServerSession(authOption);
    if(!user){
        return(
            <LoadingComponent/>
        )
    }
    return (
        <Room roomId= {params.draftId} fallback ={<LoadingComponent/>} userId={user!.user.id}>
            <CollaborativePage liveBlockId={params.draftId} userId = {user.user.id}/>
        </Room>
    )
}

export default BlogIdPage