import ConvarsationContainer from "@/components/chat_page/conversation/ConvarsationContainer";
import ItemList from "@/components/chat_page/item_list/ItemList";
import SidebarWrapper from "@/components/chat_page/sidebar/SidebarWrapper";

const ConversationPage = () => {
  return (
    <>
      <SidebarWrapper>
        <ItemList title="Conversations"></ItemList>
        <ConvarsationContainer>Conversation Page</ConvarsationContainer>;
      </SidebarWrapper>
    </>
  );
};

export default ConversationPage;
