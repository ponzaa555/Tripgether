"use client";

import ChatLayout from "@/components/chat_page/chat_layout";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import ConvarsationContainer from "@/components/chat_page/conversation/ConvarsationContainer";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import Header from "@/components/chat_page/conversation/Header";
import Body from "@/components/chat_page/conversation/Body";
import ChatInput from "@/components/chat_page/conversation/ChatInput";
import { useState } from "react";
import RemoveFriendDialog from "@/components/chat_page/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "@/components/chat_page/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "@/components/chat_page/dialogs/LeaveGroupDialog";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ChatConversationPage = ({ params: { conversationId } }: Props) => {
  const { data: session } = useSession();
  const conversation = useQuery(api.conversation.get, {
    id: conversationId,
    currentUserId: session?.user?.id!,
  });
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupFriendDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);

  return (
    <ChatLayout isFormChat={true}>
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
          <Body />
          <ChatInput />
        </ConvarsationContainer>
      )}
    </ChatLayout>
  );
};

export default ChatConversationPage;
