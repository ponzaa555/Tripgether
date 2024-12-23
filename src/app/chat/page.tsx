"use client"

import ChatLayout from "@/src/components/chat_page/chat_layout";
import ConvarsationFallback from "@/src/components/chat_page/conversation/ConvarsationFallback";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ChatPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("waiting ChatPage", session)
  },[session])

  if(session?.user.id == null){
    return <p>Loading.....</p>
  }
  return (
    <ChatLayout>
      <ConvarsationFallback />
    </ChatLayout>
  );
};

export default ChatPage;
