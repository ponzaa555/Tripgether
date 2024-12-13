"use client";

import ConvarsationFallback from "@/components/chat_page/conversation/ConvarsationFallback";
import AddFriendDialog from "@/components/chat_page/friends_page/AddFriendDialog";
import Request from "@/components/chat_page/friends_page/Request";
import ItemList from "@/components/chat_page/item_list/ItemList";
import SidebarWrapper from "@/components/chat_page/sidebar/SidebarWrapper";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

type Props = {};

const FriendsPage = (props: Props) => {
  const { data: session } = useSession();
  const requests = useQuery(api.requests.get, {
    currentUserId: session?.user!.id!,
  });

  return (
    <>
      <SidebarWrapper>
        <ItemList title="Friends" action={<AddFriendDialog />}>
          {requests ? (
            requests.length === 0 ? (
              <p className="w-full h-full flex items-center justify-center">
                No friend request found
              </p>
            ) : (
              requests.map((request) => (
                <Request
                  key={request.request._id}
                  id={request.request._id}
                  imageUrl={
                    request.sender.imageUrl ??
                    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                  }
                  username={request.sender.username ?? "Unknown"}
                  email={request.sender.email}
                />
              ))
            )
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </ItemList>
        <ConvarsationFallback />
      </SidebarWrapper>
    </>
  );
};

export default Friends_Page