import { Id } from "@/convex/_generated/dataModel";
import BigScreen from "@/src/components/trip_page/screen/BigScreen";
import NormalScreen from "@/src/components/trip_page/screen/NormalScreen";
import authOption from "@/src/lib/backend/authOption";
import { getServerSession } from "next-auth";

const TripId = async ({
  params: { tripId },
}: {
  params: {
    tripId: Id<"blogs">;
  };
}) => {
  const session = await getServerSession(authOption);
  return (
    <div>
      <div className="lg:hidden">
        <NormalScreen tripId={tripId} userId={session?.user.id || null} />
      </div>
      <div className="hidden lg:block">
        <BigScreen tripId={tripId} userId={session?.user.id || null} />
      </div>
    </div>
  );
};

export default TripId;
