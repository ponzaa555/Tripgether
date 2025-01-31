import ImageComponent from "./ImageComponent";

type GalleryContentComponentProps = {
  listUrl: string[];
};

const GalleryContentComponent = ({ listUrl }: GalleryContentComponentProps) => {
  return <ImageComponent listUrl={listUrl} />;
};

export default GalleryContentComponent;
