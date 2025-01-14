import ProfileComponent from "@/src/components/profile_page/ProfileComponent";
import LoadingComponent from "@/src/components/UI/Loading";
import authOption from "@/src/lib/backend/authOption";
import { getServerSession } from "next-auth";

const Profile = async () => {
  const session = await getServerSession(authOption);
  if (session?.user.id != null) {
    return <ProfileComponent />;
  } else {
    <LoadingComponent />;
  }
};

export default Profile;
