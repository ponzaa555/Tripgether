"use client";

import { useMutationState } from "@/src/hooks/useMutation";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/UI/alert-dialog";
import { LeaveGroupDialogProps } from "@/src/models/chat/conversation";

const LeaveGroupDialog = ({
  conversationId,
  open,
  setOpen,
}: LeaveGroupDialogProps) => {
  const { data: session } = useSession();
  const { mutate: leaveGroup, pending } = useMutationState(
    api.conversation.leaveGroup
  );
  const handleLeaveGroup = async () => {
    leaveGroup({ conversationId, currentUserId: session?.user?.id! })
      .then(() => {
        toast.success("Group left");
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occurred"
        );
      });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will not be able to see any
            previous messages or send new massages to this group
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={handleLeaveGroup}>
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveGroupDialog;
