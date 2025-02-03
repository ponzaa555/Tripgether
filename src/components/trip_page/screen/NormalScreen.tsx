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
import { useState } from "react";
import { MapPin, X } from "lucide-react";
import GoogleMapComponent from "@/src/components/GoogleMapComponent";

type BlogProps =
  | {
      coverImage?: string;
      hastagList?: string[];
      describtion?: string;
      listAlbum: Album[];
      listDate: DayTrips[];
      error?: string;
      budget?: any;
    }
  | undefined;

type Props = { tripId: Id<"blog">; userId: string | null; blog: BlogProps };

const NormalScreen = ({ tripId, userId, blog }: Props) => {
  const [showMap, setShowMap] = useState(false);
  const tripData = useQuery(api.blog.getByIdQuery, { blogId: tripId });
  const hasExpenseNote = blog?.listDate.some((day) =>
    day.ListDestination?.flatMap((destination) => destination.noteList)?.some(
      (note) => note.noteType === AllNote.Expens
    )
  );

  const calculateVisitPlaces = (listDate: DayTrips[]) => {
    if (!listDate) return 0;
    let count = 0;
    listDate.forEach((day) => {
      if (!day.ListDestination) {
        count += 0;
      }
      day.ListDestination?.forEach((destination) => {
        count += 1;
      });
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
    <div className="pt-14 relative">
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
              budget={blog?.budget?.budget}
              days={blog?.listDate.length ?? 0}
              listDate={blog?.listDate || []}
              startDate={tripData?.stDate}
              endDate={tripData?.endDate}
            />
          )}
          {blog?.listAlbum !== undefined && blog?.listAlbum.length !== 0 && (
            <GalleryComponent album={blog?.listAlbum} />
          )}
        </EnagementComponent>
      </div>
      <button
        onClick={() => setShowMap(true)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <MapPin size={24} />
      </button>
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-2xl shadow-xl w-11/12 h-5/6 overflow-hidden">
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition z-50"
            >
              <X size={20} />
            </button>
            <GoogleMapComponent />
          </div>
        </div>
      )}
    </div>
  );
};

export default NormalScreen;
