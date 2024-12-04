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
        iconActive: <MessageSquare color="orange" className="bg-orange-300" />,
        iconInActive: <MessageSquare />,
        active: pathname === "/chat",
      },
      {
        name: "Friends",
        href: "/chat/friends",
        iconActive: <Users color="orange" />,
        iconInActive: <Users />,
        active: pathname.includes("/friends"),
      },
    ],
    [pathname]
  );

  return paths;
};
