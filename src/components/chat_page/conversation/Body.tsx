import { useConversation } from "@/hooks/useConversation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import Message from "./Message";

type Props = {};

const Body = (props: Props) => {
  const { conversationId } = useConversation();
  const { data: session } = useSession();
  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
    currentUserId: session?.user?.id!,
  });
  return (
    <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages?.map(
        ({ message, senderImage, senderName, isCurrentUser }, index) => {
          const lastByUser =
            messages[index - 1]?.message.senderId ===
            messages[index].message.senderId;
          return (
            <Message
              key={message._id}
              fromCurrentUser={isCurrentUser}
              senderImage={senderImage}
              lastByUser={lastByUser}
              senderName={senderName}
              content={message.content}
              createdAt={message._creationTime}
              type={message.type}
            />
          );
        }
      )}
    </div>
  );
};

export default Body;
