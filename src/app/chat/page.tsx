import ChatLayout from "@/components/chat_page/chat_layout";
import ConvarsationFallback from "@/components/chat_page/conversation/ConvarsationFallback";

const ChatPage = () => {
  return (
    <ChatLayout>
      <ConvarsationFallback />
    </ChatLayout>
  );
};

export default ChatPage;
