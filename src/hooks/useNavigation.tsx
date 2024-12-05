import { MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
  const pathname = usePathname();

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
      },
    ],
    [pathname]
  );

  return paths;
};
