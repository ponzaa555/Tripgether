"use client";
import { Id } from "@/convex/_generated/dataModel";
import ImageCarouselComponent from "../ImageCarouselComponent";
import FloatBarComponent from "../FloatBarComponent";
import IntroComponent from "../IntroComponent";
import EnagementComponent from "../EnagementComponent";
import ListDayComponent from "../ListDayComponent";
import NavbarComponent from "../NavbarComponent";

type Props = { tripId: Id<"blogs">; userId: string | null };

const BigScreen = ({ tripId, userId }: Props) => {
  return (
    <div className="flex w-full h-screen overflow-hidden pt-14">
      <div className="flex-[0.2]">
        <NavbarComponent />
      </div>
      <div className="flex-1 h-full overflow-y-auto pb-10">
        <div id="overview">
          <ImageCarouselComponent />
          <div className="px-5 flex flex-col gap-10 mt-5">
            <div className="flex justify-center">
              <FloatBarComponent />
            </div>
            <IntroComponent />
            <div id="tripgether">
              <EnagementComponent tripId={tripId} userId={userId}>
                <ListDayComponent />
              </EnagementComponent>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[0.65] bg-blue-200">Google map</div>
    </div>
  );
};

export default BigScreen;
