"use client";
import { Id } from "@/convex/_generated/dataModel";
import EnagementComponent from "@/src/components/trip_page/EnagementComponent";
import FloatBarComponent from "@/src/components/trip_page/FloatBarComponent";
import ImageCarouselComponent from "@/src/components/trip_page/ImageCoverComponent";
import IntroComponent from "@/src/components/trip_page/IntroComponent";
import ListDayComponent from "@/src/components/trip_page/ListDayComponent";
import SummaryExpenseComponent from "@/src/components/trip_page/SummaryExpenseComponent";
import GalleryComponent from "@/src/components/trip_page/GalleryComponent";
import { Album, AllNote, DayTrips } from "@/src/models/components/Blog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type BlogProps =
  | {
      coverImage?: string;
      hastagList?: string[];
      describtion?: string;
      listAlbum: Album[];
      listDate: DayTrips[];
      error?: string;
    }
  | undefined;

type Props = { tripId: Id<"blog">; userId: string | null; blog: BlogProps };

const NormalScreen = ({ tripId, userId, blog }: Props) => {
  const tripData = useQuery(api.blog.getByIdQuery, { blogId: tripId });
  const hasExpenseNote = blog?.listDate.some((day) =>
    day.ListDestination.flatMap((destination) => destination.noteList).some(
      (note) => note.noteType === AllNote.Expens
    )
  );

  const calculateVisitPlaces = (listDate: DayTrips[]) => {
    if (!listDate) return 0;
    let count = 0;
    listDate.forEach((day) => {
      if (day.ListDestination) {
        count += day.ListDestination.length;
      }
    });
    return count;
  };

  const totalLength =
    blog?.listAlbum?.reduce(
      (acc, album) => acc + (album.listUrl?.length || 0),
      0
    ) || 0;

  const totalMedia = calculateVisitPlaces(blog?.listDate ?? []) + totalLength;

  return (
    <div className="pt-14">
      <ImageCarouselComponent coverImage={tripData?.coverImgUrl} />
      <div className="px-5 flex flex-col gap-10 mt-5">
        <div className="flex justify-center">
          <FloatBarComponent
            days={blog?.listDate.length ?? 0}
            km={267}
            media={totalMedia}
            visitPlaces={calculateVisitPlaces(blog?.listDate ?? [])}
          />
        </div>
        <IntroComponent
          description={blog?.describtion}
          userId={userId}
          title={tripData?.blogName || ""}
          createAt={tripData?._creationTime ?? 0}
        />
        <EnagementComponent tripId={tripId} userId={userId}>
          <ListDayComponent listDate={blog?.listDate || []} />
          {hasExpenseNote && (
            <SummaryExpenseComponent
              days={blog?.listDate.length ?? 0}
              listDate={blog?.listDate || []}
              startDate={tripData?.stDate}
              endDate={tripData?.endDate}
            />
          )}
          {blog?.listAlbum.length !== 0 && (
            <GalleryComponent album={blog?.listAlbum} />
          )}
        </EnagementComponent>
      </div>
    </div>
  );
};

export default NormalScreen;
