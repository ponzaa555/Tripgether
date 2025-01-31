import { Id } from "@/convex/_generated/dataModel";
import BigScreen from "@/src/components/trip_page/screen/BigScreen";
import NormalScreen from "@/src/components/trip_page/screen/NormalScreen";
import LoadingComponent from "@/src/components/UI/Loading";
import authOption from "@/src/lib/backend/authOption";
import { GetBlogMongoDb } from "@/src/lib/backend/liveblock";
import { getServerSession } from "next-auth";

const TripId = async ({
  params: { tripId },
}: {
  params: {
    tripId: Id<"blog">;
  };
}) => {
  const session = await getServerSession(authOption);
  const res = await GetBlogMongoDb("k1778zddzydmq3e6pf7nr95phs79dsn0");
  return (
    <div>
      <div className="lg:hidden">
        <NormalScreen
          blog={res.blog}
          tripId={tripId}
          userId={session?.user.id || null}
        />
      </div>
      <div className="hidden lg:block">
        <BigScreen
          blog={res.blog}
          tripId={tripId}
          userId={session?.user.id || null}
        />
      </div>
    </div>
  );
};

export default TripId;
