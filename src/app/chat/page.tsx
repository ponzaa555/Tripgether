import ChatLayout from "@/src/components/chat_page/chat_layout";
import ConvarsationFallback from "@/src/components/chat_page/conversation/ConvarsationFallback";

const ChatPage = () => {
  return (
    <ChatLayout>
      <ConvarsationFallback />
    </ChatLayout>
  );
};

export default ChatPage;
