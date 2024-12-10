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
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

type Props = {};

const FriendsPage = (props: Props) => {
  const { data: session } = useSession();
  const requests = useQuery(api.requests.get, {
    senderId: session?.user!.email!,
  });

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (requests) {
        const usersData = await Promise.all(
          requests.map(async (request) => {
            const res = await fetch(`/api/users/${request.senderId}`);
            const user = await res.json();
            return user;
          })
        );
        setUsers(usersData);
      }
    };

    fetchUsers();
  }, [requests]);
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
              users.map((user) => (
                <Request
                  key={user.id}
                  id={user.id}
                  imageUrl={user.image ?? "https://i.pravatar.cc/300"}
                  username={user.name ?? "Unknown"}
                  email={user.email}
                />
              ))
            )
          ) : (
            <Loader2 className="h-8 w-8" />
          )}
        </ItemList>
        <ConvarsationFallback />
      </SidebarWrapper>
    </>
  );
};

export default Friends_Page