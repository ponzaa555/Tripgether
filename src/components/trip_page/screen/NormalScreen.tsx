import { Id } from "@/convex/_generated/dataModel";
import EnagementComponent from "@/src/components/trip_page/EnagementComponent";
import FloatBarComponent from "@/src/components/trip_page/FloatBarComponent";
import ImageCarouselComponent from "@/src/components/trip_page/ImageCarouselComponent";
import IntroComponent from "@/src/components/trip_page/IntroComponent";
import ListDayComponent from "@/src/components/trip_page/ListDayComponent";

type Props = { tripId: Id<"blogs">; userId: string | null };

const NormalScreen = ({ tripId, userId }: Props) => {
  return (
    <div className="pt-14">
      <ImageCarouselComponent />
      <div className="px-5 flex flex-col gap-10 mt-5">
        <div className="flex justify-center">
          <FloatBarComponent />
        </div>
        <IntroComponent />
        <EnagementComponent tripId={tripId} userId={userId}>
          <ListDayComponent />
        </EnagementComponent>
      </div>
    </div>
  );
};

export default NormalScreen;
