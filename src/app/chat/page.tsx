

import ChatLayout from "@/src/components/chat_page/chat_layout";
import ConvarsationFallback from "@/src/components/chat_page/conversation/ConvarsationFallback";
import authOption from "@/src/lib/backend/authOption";
import { getServerSession } from "next-auth";

const ChatPage = async () => {
  const session = await getServerSession(authOption)
  if (session?.user.id != null) {
    return (
      <ChatLayout userID={session.user.id}>
        <ConvarsationFallback />
      </ChatLayout>
    );
  }else{
    return <p>Loading...</p>
  }
}
export default ChatPage;
