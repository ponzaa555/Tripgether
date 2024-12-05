import ConvarsationFallback from "@/components/chat_page/conversation/ConvarsationFallback";
import AddFriendDialog from "@/components/chat_page/friends_page/AddFriendDialog";
import ItemList from "@/components/chat_page/item_list/ItemList";
import SidebarWrapper from "@/components/chat_page/sidebar/SidebarWrapper";

type Props = {};

const FriendsPage = (props: Props) => {
  return (
    <>
      <SidebarWrapper>
        <ItemList title="Friends" action={<AddFriendDialog />}></ItemList>
        <ConvarsationFallback />
      </SidebarWrapper>
    </>
  );
};

export default FriendsPage;
