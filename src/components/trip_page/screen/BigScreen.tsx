/* eslint-disable @next/next/no-img-element */
"use client";
import { Id } from "@/convex/_generated/dataModel";
import ImageCarouselComponent from "@/src/components/trip_page/ImageCoverComponent";
import FloatBarComponent from "@/src/components/trip_page/FloatBarComponent";
import IntroComponent from "@/src/components/trip_page/IntroComponent";
import EnagementComponent from "@/src/components/trip_page/EnagementComponent";
import ListDayComponent from "@/src/components/trip_page/ListDayComponent";
import NavbarComponent from "@/src/components/trip_page/NavbarComponent";
import SummaryExpenseComponent from "@/src/components/trip_page/SummaryExpenseComponent";
import GalleryComponent from "@/src/components/trip_page/GalleryComponent";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Album, AllNote, DayTrips } from "@/src/models/components/Blog";
import { UploadFile } from "antd";
import { useEffect } from "react";
import GoogleMapComponent from "../../GoogleMapComponent";

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

const BigScreen = ({ tripId, userId, blog }: Props) => {
  const tripData = useQuery(api.blog.getByIdQuery, { blogId: tripId });

  const getVisitPlacesLinks = (listDate: DayTrips[]) => {
    let links: string[] = [];
    listDate.forEach((day) => {
      if (day.ListDestination) {
        day.ListDestination.forEach((destination) => {
          destination.noteList.forEach((note) => {
            if (note.noteType === AllNote.Photo) {
              links = [
                ...links,
                ...note.listImage
                  .map((image: UploadFile<any>) => image.url)
                  .filter((url): url is string => url !== undefined),
              ];
            }
          });
        });
      }
    });
    return links;
  };
  const visitPlacesLinks = getVisitPlacesLinks(blog?.listDate || []);
  const albumLinks = blog?.listAlbum.flatMap((album) => album.listUrl || []);
  const combinedLinks = [...visitPlacesLinks, ...(albumLinks ?? [])];

  const calculateVisitPlaces = (listDate: DayTrips[]) => {
    let total = 0;
    listDate.forEach((day) => {
      if (day.ListDestination) {
        day.ListDestination.forEach((destination) => {
          total += destination.noteList.reduce((acc, note) => {
            if (note.noteType === AllNote.Photo) {
              return acc + note.listImage.length;
            }
            return acc;
          }, 0);
        });
      }
    });
    return total;
  };

  const totalLength =
    blog?.listAlbum?.reduce(
      (acc, album) => acc + (album.listUrl?.length || 0),
      0
    ) || 0;

  const totalMedia = calculateVisitPlaces(blog?.listDate ?? []) + totalLength;

  useEffect(() => {
    const element = document.getElementById("overview");
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  const hasExpenseNote = blog?.listDate.some((day) =>
    day.ListDestination.flatMap((destination) => destination.noteList).some(
      (note) => note.noteType === AllNote.Expens
    )
  );

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="flex-[0.1]">
        <NavbarComponent images={combinedLinks} hasExpense={hasExpenseNote} />
      </div>
      <div className="flex-1 h-full overflow-y-auto pb-10">
        <div id="overview" className="pt-14">
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
              <div id="tripgether">
                <ListDayComponent listDate={blog?.listDate || []} />
              </div>
              {hasExpenseNote && (
                <div id="expense">
                  <SummaryExpenseComponent
                    days={blog?.listDate.length ?? 0}
                    listDate={blog?.listDate || []}
                    startDate={tripData?.stDate}
                    endDate={tripData?.endDate}
                  />
                </div>
              )}
              {blog?.listAlbum.length !== 0 && (
                <div id="gallery">
                  <GalleryComponent album={blog?.listAlbum} />
                </div>
              )}
            </EnagementComponent>
          </div>
        </div>
      </div>
      <div className="flex-[0.6] bg-blue-200 w-full h-screen">
        <GoogleMapComponent />
      </div>
    </div>
  );
};

export default BigScreen;
