import ConvarsationFallback from "@/components/chat_page/conversation/ConvarsationFallback";
import AddFriendDialog from "@/components/chat_page/friends_page/AddFriendDialog";
import Request from "@/components/chat_page/friends_page/Request";
import ItemList from "@/components/chat_page/item_list/ItemList";
import SidebarWrapper from "@/components/chat_page/sidebar/SidebarWrapper";

type Props = {};

const FriendsPage = (props: Props) => {
  return (
    <>
      <SidebarWrapper>
        <ItemList title="Friends" action={<AddFriendDialog />}>
          {/* <p className="w-full h-full flex items-center justify-center">
            No friend requests fond
          </p> */}
          {/* If have data show below. */}
          <Request
            key={1}
            id={"1"}
            imageUrl={"https://i.pravatar.cc/300"}
            username={"John Doe"}
            email={"johndoe@gmail.com"}
          />
        </ItemList>
        <ConvarsationFallback />
      </SidebarWrapper>
    </>
  );
};

export default FriendsPage;
