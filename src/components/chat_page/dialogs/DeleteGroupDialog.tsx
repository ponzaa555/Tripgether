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
import { DeleteGroupDialogProps } from "@/src/models/chat/conversation";

const DeleteGroupDialog = ({
  conversationId,
  open,
  setOpen,
}: DeleteGroupDialogProps) => {
  const { data: session } = useSession();
  const { mutate: deleteGroup, pending } = useMutationState(
    api.conversation.deleteGroup
  );
  const handleDeleteGroup = async () => {
    deleteGroup({ conversationId, currentUserId: session?.user?.id! })
      .then(() => {
        toast.success("Group deleted");
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
            This action cannot be undone. All messages will be deleted and you
            will not be able to message this group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={handleDeleteGroup}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGroupDialog;
