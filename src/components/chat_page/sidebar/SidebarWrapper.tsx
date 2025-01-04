import React from "react";
import ChatNavbar from "@/src/components/chat_page/chat_navbar/ChatNavbar";
import MobileChatNavbar from "@/src/components/chat_page/chat_navbar/MobileChatNavbar";
import { SidebarWrapperProps } from "@/src/models/chat/conversation";

const SidebarWrapper = ({ children, userId }: SidebarWrapperProps) => {
  return (
    <div className="h-[calc(100vh-60px)] w-full p-4 flex flex-col lg:flex-row gap-4">
      <MobileChatNavbar userId={userId} />
      <ChatNavbar userId={userId} />
      <main className="h-[calc(100%-80px)] lg:h-full w-full flex gap-4">
        {children}
      </main>
    </div>
  );
};

export default SidebarWrapper;
