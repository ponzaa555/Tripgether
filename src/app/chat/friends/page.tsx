import { getServerSession } from "next-auth";
import FriendsPage from "@/src/app/chat/friends/_components/FriendsPageClient";
import authOption from "@/src/lib/backend/authOption";

const Friends_Page = async () => {
  const session = await getServerSession(authOption);
  if (session?.user.id != null) {
    return <FriendsPage userId={session.user.id} />;
  } else {
    return <p>Loading...</p>;
  }
};

export default Friends_Page;
