import { Id } from "@/convex/_generated/dataModel";
import { Dispatch, SetStateAction } from "react";

export type UserIdProps = {
  userId: string;
};

export type DialogProps = {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type ChatConversationComponentProps = {
  conversationId: Id<"conversations">;
} & UserIdProps;

export type ChatConversationPageProps = {
  params: {
    conversationId: Id<"conversations">;
  };
};

export type FriendsPageProps = UserIdProps;

export type ChatNavbarProps = UserIdProps;

export type MobileChatNavbarProps = UserIdProps;

export type BodyProps = {
  members: {
    lastSeenMessageId?: Id<"messages">;
    username?: string;
    [key: string]: any;
  }[];
} & UserIdProps;

export type ChatInputProps = UserIdProps;

export type DMConversationProps = {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  unseenCount: number;
};

export type GroupConversationItemProps = {
  id: Id<"conversations">;
  name: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  unseenCount: number;
};

export type HeaderProps = {
  imageUrl?: string;
  name: string;
  options?: {
    label: string;
    destructive: boolean;
    onClick: () => void;
  }[];
};

export type MessageProps = {
  fromCurrentUser: boolean;
  senderImage: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  seen?: React.ReactNode;
  type: string;
};

export type CreateGroupDialogProps = UserIdProps;

export type DeleteGroupDialogProps = DialogProps;

export type LeaveGroupDialogProps = DialogProps;

export type RemoveFriendDialogProps = DialogProps & UserIdProps;

export type AddFriendDialogProps = UserIdProps;

export type RequestProps = {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
};

export type ItemListProps = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

export type SidebarWrapperProps = {
  children: React.ReactNode;
} & UserIdProps;

export type ChatPageProps = {
  children: React.ReactNode;
} & UserIdProps;
