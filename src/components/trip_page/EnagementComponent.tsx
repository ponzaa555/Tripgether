"use client";
import { FaBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { CiShare2, CiBookmark } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import CommentComponent from "./CommentComponent";
import ListShowCommentComponent from "./ListShowCommentComponent";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/src/components/UI/Button";
import { Loader2 } from "lucide-react";
import { useMutationState } from "@/src/hooks/useMutation";
import SharesDialog from "./SharesDialog";
import { useState } from "react";
import { useModal } from "@/src/context/ModalContext";

const EnagementComponent = ({
  tripId,
  userId,
}: {
  tripId: Id<"blogs">;
  userId: string | null;
}) => {
  const { openLoginModal } = useModal();
  const [sharesDialog, setSharesDialog] = useState(false);

  const allLike = useQuery(api.engagement.getLikesByBlog, {
    blogId: tripId,
  });
  const allComment = useQuery(api.engagement.getCommentsByBlog, {
    blogId: tripId,
  });
  const allBookmark = useQuery(api.engagement.getBookmarksByBlog, {
    blogId: tripId,
  });
  const { mutate: likeMutate } = useMutationState(api.engagement.like);
  const { mutate: bookmarkMutate } = useMutationState(api.engagement.bookmark);

  const like = allLike?.some((like) => like.user?.userId === userId);
  const bookmark = allBookmark?.some(
    (bookmark) => bookmark.user?.userId === userId
  );
  const reversedComments = allComment ? [...allComment].reverse() : [];

  if (
    allLike === undefined ||
    allComment === undefined ||
    allBookmark === undefined
  ) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <SharesDialog open={sharesDialog} setOpen={setSharesDialog} />
      <div className="flex flex-row gap-5">
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => {
            if (!userId) {
              openLoginModal();
              return;
            }
            likeMutate({
              blogId: tripId,
              currentUserId: userId,
            });
          }}
        >
          {like ? <IoIosHeart color="red" /> : <FaRegHeart color="gray" />}
          <p>{allLike.length} likes</p>
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => {
            document
              .getElementById("comment")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaRegComment color="gray" />
          <p>{allComment.length} Comment</p>
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => {
            if (!userId) {
              openLoginModal();
              return;
            }
            bookmarkMutate({
              blogId: tripId,
              currentUserId: userId,
            });
          }}
        >
          {bookmark ? (
            <FaBookmark color="orange" />
          ) : (
            <CiBookmark color="gray" />
          )}
          <p>{allBookmark.length} Saved</p>
        </div>
        <Button
          onClick={() => {
            setSharesDialog(true);
          }}
        >
          <CiShare2 color="white" />
          <p>Shares</p>
        </Button>
      </div>
      <div id="comment" className="gap-2">
        <CommentComponent userId={userId} tripId={tripId} />
        <ListShowCommentComponent
          allComment={reversedComments}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default EnagementComponent;
