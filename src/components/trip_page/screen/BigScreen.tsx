"use client";
import { Id } from "@/convex/_generated/dataModel";
import ImageCarouselComponent from "../ImageCoverComponent";
import FloatBarComponent from "../FloatBarComponent";
import IntroComponent from "../IntroComponent";
import EnagementComponent from "../EnagementComponent";
import ListDayComponent from "../ListDayComponent";
import NavbarComponent from "../NavbarComponent";
import SummaryExpenseComponent from "../SummaryExpenseComponent";
import GalleryComponent from "../GalleryComponent";

type Props = { tripId: Id<"blogs">; userId: string | null };

const BigScreen = ({ tripId, userId }: Props) => {
  return (
    <div className="flex w-full h-screen overflow-hidden pt-14">
      <div className="flex-[0.1]">
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
            <EnagementComponent tripId={tripId} userId={userId}>
              <div id="tripgether">
                <ListDayComponent />
              </div>
              <div id="expense">
                <SummaryExpenseComponent />
              </div>
              <div id="gallery">
                <GalleryComponent />
              </div>
            </EnagementComponent>
          </div>
        </div>
      </div>
      <div className="flex-[0.6] bg-blue-200">Google map</div>
    </div>
  );
};

export default BigScreen;
