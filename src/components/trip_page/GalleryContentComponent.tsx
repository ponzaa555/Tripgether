import ImageComponent from "@/src/components/trip_page/ImageComponent";

type GalleryContentComponentProps = {
  listUrl: string[];
};

const GalleryContentComponent = ({ listUrl }: GalleryContentComponentProps) => {
  return <ImageComponent listUrl={listUrl} />;
};

export default GalleryContentComponent;
