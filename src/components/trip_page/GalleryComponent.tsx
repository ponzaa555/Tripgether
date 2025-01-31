import { Album } from "@/src/models/components/Blog";
import ListGalleryComponent from "@/src/components/trip_page/ListGalleryComponent";

type GalleryComponentProps = {
  album: Album[] | undefined;
};

const GalleryComponent = ({ album }: GalleryComponentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-black">My Gallery</h1>
      <p className="text-sm">Let' collect your memories here.</p>
      <ListGalleryComponent album={album} />
    </div>
  );
};

export default GalleryComponent;
