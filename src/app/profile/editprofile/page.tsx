import EditProfileComponent from "@/src/components/editprofile_page/EditProfileComponent";
import LoadingComponent from "@/src/components/UI/Loading";
import authOption from "@/src/lib/backend/authOption";
import { getServerSession } from "next-auth";

const EditProfile = async () => {
  const session = await getServerSession(authOption);
  if (session?.user.id != null) {
    return <EditProfileComponent userId={session.user.id} />;
  } else {
    <LoadingComponent />;
  }
};

export default EditProfile;
