
import { Room } from "@/src/components/room"

import LoadingComponent from "@/src/components/UI/Loading"
import { CollaborativePage } from "./_components/collaborative-page"

import { getServerSession } from "next-auth"
import authOption from "@/src/lib/backend/authOption"
interface BlogIdPageProps {
    params: {
        tripId: string
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
        <Room roomId= {params.tripId} fallback ={<LoadingComponent/>} userId={user!.user.id}>
            <CollaborativePage blogId={params.tripId}/>
        </Room>
    )
}

export default BlogIdPage