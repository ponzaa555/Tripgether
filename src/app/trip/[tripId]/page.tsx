import { Id } from "@/convex/_generated/dataModel";
import EnagementComponent from "@/src/components/trip_page/EnagementComponent";
import LoadingComponent from "@/src/components/UI/Loading";
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
    <EnagementComponent tripId={tripId} userId={session?.user?.id || null} />
  );
};

export default TripId;
