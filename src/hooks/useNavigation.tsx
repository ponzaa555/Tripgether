import { useQuery } from "convex/react";
import { MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { use, useMemo } from "react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";

type Props = {
  userId :string
}

export const useNavigation = ({userId}:Props) => {
  const pathname = usePathname();
  const requestCount = useQuery(api.requests.count, {
    currentUserId: userId,
  });

  const conversations = useQuery(api.conversations.get, {
    currentUserId: userId,
  });

  const unseenMessagesCount = useMemo(() => {
    return conversations?.reduce((acc, curr) => {
      return acc + curr.unseenCount;
    }, 0);
  }, [conversations]);

  const paths = useMemo(
    () => [
      {
        name: "Conversations",
        href: "/chat",
        icon: <MessageSquare />,
        active: pathname.startsWith("/chat") && !pathname.endsWith("/friends"),
        count: unseenMessagesCount,
      },
      {
        name: "Friends",
        href: "/chat/friends",
        icon: <Users />,
        active: pathname.startsWith("/chat") && pathname.endsWith("/friends"),
        count: requestCount,
      },
    ],
    [pathname, requestCount, unseenMessagesCount]
  );

  return paths;
};
