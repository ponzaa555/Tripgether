import ConvarsationFallback from "@/components/chat_page/conversation/ConvarsationFallback";
import ItemList from "@/components/chat_page/item_list/ItemList";
import SidebarWrapper from "@/components/chat_page/sidebar/SidebarWrapper";

const ChatPage = () => {
  return (
    <>
      <SidebarWrapper>
        <ItemList title="Conversations"></ItemList>
        <ConvarsationFallback />
      </SidebarWrapper>
    </>
  );
};

export default ChatPage;
