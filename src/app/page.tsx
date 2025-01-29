import authOption from "@/src/lib/backend/authOption";
import { getServerSession } from "next-auth";
import HomeComponent from "@/src/components/home_page/HomeComponent";

const Home = async () => {
  const session = await getServerSession(authOption);
  return <HomeComponent session={session} />;
};
export default Home;
