"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";

import { Card } from "@/src/components/ui/card";
import { useMutationState } from "@/src/hooks/useMutation";
import { Check, User, X } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
};

const Request = ({ id, imageUrl, username, email }: Props) => {
  const { data: session } = useSession();
  const { mutate: denyRequest, pending: denyPending } = useMutationState(
    api.request.deny
  );
  const { mutate: acceptRequest, pending: acceptPending } = useMutationState(
    api.request.accept
  );
  return (
    <Card className="w-full p-2 flex items-center gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            disabled={denyPending || acceptPending}
            onClick={() => {
              acceptRequest({ id, currentUserId: session?.user!.id! })
                .then(() => {
                  toast.success("Friend Request Accepted!");
                })
                .catch((e) => {
                  toast.error(
                    e instanceof ConvexError
                      ? e.data
                      : "Unexpected error occurred"
                  );
                });
            }}
          >
            <Check />
          </Button>
          <Button
            size="icon"
            disabled={denyPending || acceptPending}
            variant="destructive"
            onClick={() => {
              denyRequest({ id, currentUserId: session?.user!.id! })
                .then(() => {
                  toast.success("Friend Request denied!");
                })
                .catch((e) => {
                  toast.error(
                    e instanceof ConvexError
                      ? e.data
                      : "Unexpected error occurred"
                  );
                });
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Request;
