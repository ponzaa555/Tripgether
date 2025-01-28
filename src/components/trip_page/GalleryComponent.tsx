import ListGalleryComponent from "./ListGalleryComponent";

const GalleryComponent = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-black">My Gallery</h1>
      <p className="text-sm">Let' collect your memories here.</p>
      <ListGalleryComponent />
    </div>
  );
};

export default GalleryComponent;
