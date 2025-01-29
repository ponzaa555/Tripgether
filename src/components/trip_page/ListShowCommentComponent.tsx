"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/UI/avatar";
import { HiDotsVertical } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/UI/popover";
import { Button } from "@/src/components/UI/Button";
import { Trash2, User } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useState } from "react";

type User = {
  _id: Id<"users">;
  _creationTime: number;
  username: string;
  imageUrl: string;
  userId: string;
  email: string;
};

type Comment = {
  _id: Id<"comment">;
  _creationTime: number;
  userId: Id<"users">;
  content: string;
  blogId: Id<"blogs">;
  createdAt: string;
  user: User | null;
};

const ListShowCommentComponent = ({
  allComment,
  userId,
}: {
  allComment: Comment[];
  userId: string | null;
}) => {
  const [selectedCommentId, setSelectedCommentId] =
    useState<Id<"comment"> | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (commentId: Id<"comment">) => {
    setSelectedCommentId(commentId);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <ConfirmDeleteDialog
        commentId={selectedCommentId}
        currentUserId={userId}
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
      />
      {allComment.map((data) => (
        <div key={data._id} className="flex flex-row gap-4 items-start">
          <div>
            <Avatar>
              <AvatarImage src={data.user?.imageUrl} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row justify-between">
              <p>
                {data.user?.username}{" "}
                <span className="text-gray-400 text-sm">
                  {formatDistanceToNow(new Date(data.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </p>
              {userId === data.user?.userId && (
                <Popover>
                  <PopoverTrigger>
                    <HiDotsVertical />
                  </PopoverTrigger>
                  <PopoverContent className="p-2 w-min">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleDeleteClick(data._id);
                      }}
                    >
                      <Trash2 />
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <p>{data.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListShowCommentComponent;
