import { Id } from "@/convex/_generated/dataModel";
import BigScreen from "@/src/components/trip_page/screen/BigScreen";
import NormalScreen from "@/src/components/trip_page/screen/NormalScreen";
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
  const res = await GetBlogMongoDb("k17fnkb25n6nthxv0qwxkfaz7n79fz9y");
  // Print the entire structure of the response
  console.log(JSON.stringify(res, null, 2));

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
