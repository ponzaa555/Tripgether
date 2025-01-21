import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
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
import { useMutationState } from "@/src/hooks/useMutation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const ConfirmDeleteDialog = ({
  commentId,
  currentUserId,
  open,
  setOpen,
}: {
  commentId: Id<"comment"> | null;
  currentUserId: string | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { mutate: deleteComment, pending } = useMutationState(
    api.engagement.deleteComment
  );

  const hadleDeleteComment = async () => {
    deleteComment({ commentId, currentUserId })
      .then(() => {
        toast.success("Comment deleted");
      })
      .catch(() => {
        toast.error("Unexpected error occurred");
      });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Messages will be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={hadleDeleteComment}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;
