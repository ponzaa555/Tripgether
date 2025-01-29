"use client";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { format } from "date-fns";
import Image from "next/image";
import { TfiWorld } from "react-icons/tfi";
import LoadingComponent from "@/src/components/UI/Loading";
import { useRouter } from "next/navigation";

const ShowRecommandComponent = () => {
  const { results, loadMore, status } = usePaginatedQuery(
    api.blog.infiniteScrollAndSearch,
    { query: "" },
    { initialNumItems: 10 }
  );
  const router = useRouter();

  if (status === "LoadingFirstPage") {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col items-center px-3">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full px-10">
        {results.map((data) => (
          <div
            key={data._id}
            className="break-inside-avoid flex flex-col gap-1 pb-10 cursor-pointer"
            onClick={() => router.push(`/trip/${data._id}`)}
          >
            <div className="relative w-full h-0 pb-[100%]">
              <Image
                src={
                  data.coverImgUrl ??
                  "https://www.huber-online.com/daisy_website_files/product_img/no-image.jpg"
                }
                alt={data.blogName}
                layout="fill"
                objectFit="cover"
                className="shadow-sm rounded-lg hover:scale-105 transform transition-transform duration-300"
              />
            </div>
            <div>
              <p className="flex font-light text-xs text-gray-400 items-baseline gap-1">
                {format(new Date(data._creationTime), "d MMM, yy 'at' h:mm a")}
                <span>
                  <TfiWorld />
                </span>
              </p>
            </div>
            <h3 className="text-sm font-black">{data.blogName}</h3>
            <p className="text-xs text-gray-800">{data.user?.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowRecommandComponent;
