"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SidebarWrapper from "@/src/components/chat_page/sidebar/SidebarWrapper";
import ItemList from "@/src/components/chat_page/item_list/ItemList";
import DMConversation from "@/src/components/chat_page/conversation/DMConversation";
import { Loader2 } from "lucide-react";
import CreateGroupDialog from "@/src/components/chat_page/dialogs/CreateGroupDialog";
import GroupConversationItem from "@/src/components/chat_page/conversation/GroupConversationItem";
import { ChatPageProps } from "@/src/models/chat/conversation";

const ChatLayout = ({ children, userId }: ChatPageProps) => {
  const conversations = useQuery(api.conversations.get, {
    currentUserId: userId,
  });
  return (
    <div className="pt-14">
      <SidebarWrapper userId={userId}>
        <ItemList
          title="Conversations"
          action={<CreateGroupDialog userId={userId} />}
        >
          {conversations ? (
            conversations.length === 0 ? (
              <p className="w-full h-full flex items-center justify-center">
                No conversation found
              </p>
            ) : (
              conversations.map((conversation) =>
                conversation.conversation.isGroup ? (
                  <GroupConversationItem
                    key={conversation.conversation._id}
                    id={conversation.conversation._id}
                    name={conversation.conversation.name || ""}
                    lastMessageContent={conversation.lastMessage?.content}
                    lastMessageSender={conversation.lastMessage?.sender}
                    unseenCount={conversation.unseenCount}
                  />
                ) : (
                  <DMConversation
                    key={conversation.conversation._id}
                    id={conversation.conversation._id}
                    imageUrl={
                      conversation.otherMember?.imageUrl ??
                      "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                    }
                    username={conversation.otherMember?.username ?? "Unknown"}
                    lastMessageContent={conversation.lastMessage?.content}
                    lastMessageSender={conversation.lastMessage?.sender}
                    unseenCount={conversation.unseenCount}
                  />
                )
              )
            )
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </ItemList>
        {children}
      </SidebarWrapper>
    </div>
  );
};

export default ChatLayout;
