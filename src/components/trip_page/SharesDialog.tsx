"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/UI/alert-dialog";
import { Dispatch, SetStateAction } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const SharesDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Social share</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-row gap-2">
          <FacebookShareButton url={window.location.href} hashtag="#tripgether">
            <FacebookIcon round={true} />
          </FacebookShareButton>
          <LinkedinShareButton url={window.location.href} title="Tripgether">
            <LinkedinIcon round={true} />
          </LinkedinShareButton>
          <TwitterShareButton url={window.location.href} title="Tripgether">
            <TwitterIcon round={true} />
          </TwitterShareButton>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SharesDialog;
