"use client";

import { Input } from "@/src/components/UI/input";
import { Button } from "@/src/components/UI/Button";
import { Avatar, AvatarFallback } from "@/src/components/UI/avatar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { useMutationState } from "@/src/hooks/useMutation";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { toast } from "sonner";

const CommentComponent = ({
  tripId,
  userId,
}: {
  tripId: Id<"blogs">;
  userId: string;
}) => {
  const userData = useQuery(api.user.getUserData, {
    userId: userId,
  });

  const { mutate: createComment } = useMutationState(
    api.engagement.createComment
  );

  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment === "") {
      toast.error("Comment cannot be empty");
    } else {
      createComment({
        blogId: tripId,
        currentUserId: userId,
        content: comment,
      });
      toast.success("Comment posted");
      setComment("");
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <Avatar>
        <AvatarImage src={userData?.imageUrl} />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Input
          onChange={handleChange}
          value={comment}
          placeholder="Write a comment"
          className="bg-slate-100 rounded-full w-full"
        />
      </div>
      <Button className="w-min" onClick={handleSubmit}>
        Post
      </Button>
    </div>
  );
};

export default CommentComponent;
