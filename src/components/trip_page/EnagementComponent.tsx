"use client";
import { FaBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { CiShare2, CiBookmark } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import CommentComponent from "@/src/components/trip_page/CommentComponent";
import ListShowCommentComponent from "@/src/components/trip_page/ListShowCommentComponent";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/src/components/UI/Button";
import { Loader2 } from "lucide-react";
import { useMutationState } from "@/src/hooks/useMutation";
import SharesDialog from "@/src/components/trip_page/SharesDialog";
import { useState } from "react";
import { useModal } from "@/src/context/ModalContext";

const EnagementComponent: React.FC<{
  tripId: Id<"blog">;
  userId: string | null;
  children: React.ReactNode;
}> = ({ tripId, userId, children }) => {
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
    <div className="flex flex-col gap-5 w-full">
      <SharesDialog open={sharesDialog} setOpen={setSharesDialog} />
      <div className="flex flex-row justify-evenly gap-5 sm:justify-start">
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
          <div className="flex flex-row gap-2 justify-center items-center">
            {like ? (
              <IoIosHeart color="red" size={20} />
            ) : (
              <FaRegHeart color="gray" size={20} />
            )}
            <p>{allLike.length}</p>
            <p className="hidden sm:block">likes</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center cursor-default">
          <div className="flex flex-row gap-2 justify-center items-center">
            <FaRegComment color="gray" size={20} />
            <p>{allComment.length}</p>
            <p className="hidden sm:block">Comment</p>
          </div>
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
          <div className="flex flex-row gap-2 justify-center items-center">
            {bookmark ? (
              <FaBookmark color="orange" size={20} />
            ) : (
              <CiBookmark color="gray" size={20} />
            )}
            <p>{allBookmark.length}</p>
            <p className="hidden sm:block">Saved</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setSharesDialog(true);
          }}
        >
          <CiShare2 color="white" size={20} />
          <p>Shares</p>
        </Button>
      </div>
      <div className="w-full border-[0.5px] border-slate-200"></div>
      {children}
      <div className="flex flex-col gap-5">
        <p className="text-lg font-black">Comments</p>
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
