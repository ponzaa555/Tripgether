import { useQuery } from "convex/react";
import { MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { api } from "../../convex/_generated/api";
import { useSession } from "next-auth/react";

export const useNavigation = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const requestCount = useQuery(api.requests.count, {
    currentUserId: session?.user!.id!,
  });

  const paths = useMemo(
    () => [
      {
        name: "Conversations",
        href: "/chat",
        icon: <MessageSquare />,
        active: pathname.startsWith("/chat") && !pathname.endsWith("/friends"),
      },
      {
        name: "Friends",
        href: "/chat/friends",
        icon: <Users />,
        active: pathname.startsWith("/chat") && pathname.endsWith("/friends"),
        count: requestCount,
      },
    ],
    [pathname, requestCount]
  );

  return paths;
};
