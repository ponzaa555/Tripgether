"use client";

import ChatLayout from "@/src/components/chat_page/chat_layout";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import ConvarsationContainer from "@/src/components/chat_page/conversation/ConvarsationContainer";
import { api } from "@/convex/_generated/api";
import Header from "@/src/components/chat_page/conversation/Header";
import Body from "@/src/components/chat_page/conversation/Body";
import ChatInput from "@/src/components/chat_page/conversation/ChatInput";
import { useState } from "react";
import RemoveFriendDialog from "@/src/components/chat_page/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "@/src/components/chat_page/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "@/src/components/chat_page/dialogs/LeaveGroupDialog";
import { ChatConversationComponentProps } from "@/src/models/chat/conversation";

const ChatConversationComponent = ({
  conversationId,
  userId,
}: ChatConversationComponentProps) => {
  const conversation = useQuery(api.conversation.get, {
    id: conversationId,
    currentUserId: userId,
  });
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupFriendDialogOpen] = useState(false);

  return (
    <ChatLayout userId={userId}>
      {conversation === undefined ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : conversation === null ? (
        <p className="w-full h-full flex items-center justify-center">
          Conversation not found
        </p>
      ) : (
        <ConvarsationContainer>
          <RemoveFriendDialog
            conversationId={conversationId}
            open={removeFriendDialogOpen}
            setOpen={setRemoveFriendDialogOpen}
            userId={userId}
          />
          <DeleteGroupDialog
            conversationId={conversationId}
            open={deleteGroupDialogOpen}
            setOpen={setDeleteGroupDialogOpen}
          />
          <LeaveGroupDialog
            conversationId={conversationId}
            open={leaveGroupDialogOpen}
            setOpen={setLeaveGroupFriendDialogOpen}
          />
          <Header
            name={
              (conversation.isGroup
                ? conversation.name
                : conversation.otherMember?.username) || ""
            }
            imageUrl={
              conversation.isGroup
                ? undefined
                : conversation.otherMember?.imageUrl
            }
            options={
              conversation.isGroup
                ? [
                    {
                      label: "Leave group",
                      destructive: false,
                      onClick: () => setLeaveGroupFriendDialogOpen(true),
                    },
                    {
                      label: "Delete group",
                      destructive: true,
                      onClick: () => setDeleteGroupDialogOpen(true),
                    },
                  ]
                : [
                    {
                      label: "Remove friend",
                      destructive: true,
                      onClick: () => setRemoveFriendDialogOpen(true),
                    },
                  ]
            }
          />
          <Body
            members={
              conversation.isGroup
                ? conversation.otherMembers
                  ? conversation.otherMembers
                  : []
                : conversation.otherMember
                  ? [conversation.otherMember]
                  : []
            }
            userId={userId}
          />
          <ChatInput userId={userId} />
        </ConvarsationContainer>
      )}
    </ChatLayout>
  );
};

export default ChatConversationComponent;
