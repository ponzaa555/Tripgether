import Link from "next/link";
import { Card } from "@/src/components/UI/card";
import { Avatar, AvatarFallback } from "@/src/components/UI/avatar";
import { Badge } from "@/src/components/UI/badge";
import { GroupConversationItemProps } from "@/src/models/chat/conversation";

const GroupConversationItem = ({
  id,
  name,
  lastMessageContent,
  unseenCount,
  lastMessageSender,
}: GroupConversationItemProps) => {
  return (
    <Link href={`/chat/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarFallback>
              {name.charAt(0).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{name}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                <p className="font-semibold">
                  {lastMessageSender}
                  {":"}&nbsp;
                </p>
                <p className="truncate overflow-ellipsis">
                  {lastMessageContent}
                </p>
              </span>
            ) : (
              <p className="text-sm text-muted-foreground truncate">
                Start the conversation!
              </p>
            )}
          </div>
        </div>
        {unseenCount ? <Badge>{unseenCount}</Badge> : null}
      </Card>
    </Link>
  );
};

export default GroupConversationItem;
