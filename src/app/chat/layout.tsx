"use client";
import ItemList from "@/components/chat_page/item_list/ItemList";
import SidebarWrapper from "@/components/chat_page/sidebar/SidebarWrapper";
import { usePathname } from "next/navigation";

type Props = React.PropsWithChildren<{}>;

export default function ChatLayout({ children }: Props) {
  const pathname = usePathname();
  return (
    <>
      <SidebarWrapper>
        <ItemList
          title={pathname === "/chat" ? "Conversations" : "Friends"}
        ></ItemList>
        {children}
      </SidebarWrapper>
      ;
    </>
  );
}
