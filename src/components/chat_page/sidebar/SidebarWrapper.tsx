import React from "react";
import ChatNavbar from "@/components/chat_page/chat_navbar/ChatNavbar";
import MobileChatNavbar from "@/components/chat_page/chat_navbar/MobileChatNavbar";

type Props = React.PropsWithChildren<{}>;

const SidebarWrapper = ({ children }: Props) => {
  return (
    <div className="h-[calc(100vh-60px)] w-full p-4 flex flex-col lg:flex-row gap-4">
      <MobileChatNavbar />
      <ChatNavbar />
      <main className="h-[calc(100%-80px)] lg:h-full w-full flex gap-4">
        {children}
      </main>
    </div>
  );
};

export default SidebarWrapper;
