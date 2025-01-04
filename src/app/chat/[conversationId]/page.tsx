import { Id } from "@/convex/_generated/dataModel";
import { getServerSession } from "next-auth";
import ChatConversationComponent from "./_components/ChatConversationComponent";
import authOption from "@/src/lib/backend/authOption";
import { ChatConversationPageProps } from "@/src/models/chat/conversation";

const ChatConversationPage = async ({
  params: { conversationId },
}: ChatConversationPageProps) => {
  const session = await getServerSession(authOption);
  if (session?.user.id == null) {
    return <p>Loading ....</p>;
  }
  return (
    <ChatConversationComponent
      userId={session?.user.id as string}
      conversationId={conversationId as Id<"conversations">}
    />
  );
};

export default ChatConversationPage;
