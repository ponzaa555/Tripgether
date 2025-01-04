"use client";

import ConvarsationFallback from "@/src/components/chat_page/conversation/ConvarsationFallback";
import AddFriendDialog from "@/src/components/chat_page/friends_page/AddFriendDialog";
import Request from "@/src/components/chat_page/friends_page/Request";
import ItemList from "@/src/components/chat_page/item_list/ItemList";
import SidebarWrapper from "@/src/components/chat_page/sidebar/SidebarWrapper";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { FriendsPageProps } from "@/src/models/chat/conversation";

const FriendsPage = ({ userId }: FriendsPageProps) => {
  const requests = useQuery(api.requests.get, {
    currentUserId: userId,
  });

  return (
    <>
      <SidebarWrapper userId={userId}>
        <ItemList title="Friends" action={<AddFriendDialog userId={userId} />}>
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

export default FriendsPage;
