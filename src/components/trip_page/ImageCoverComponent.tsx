import Image from "next/image";

const ImageCover = () => {
  return (
    <div className="relative flex flex-col h-[400px] gap-5 items-center w-full">
      <div className="flex justify-center w-full relative overflow-hidden h-[400px]">
        <Image
          src={
            "https://media.istockphoto.com/id/165497033/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%80%E0%B8%87%E0%B8%B2%E0%B8%A7%E0%B8%B1%E0%B8%A7%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A3%E0%B8%B2%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B9%83%E0%B8%99%E0%B8%A0%E0%B8%B9%E0%B8%A1%E0%B8%B4%E0%B8%97%E0%B8%B1%E0%B8%A8%E0%B8%99%E0%B9%8C%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94.jpg?s=1024x1024&w=is&k=20&c=7RlJrK0e1oMk3jUNIkA5rZ7ojCQsZaXV1slsSKYb8C4="
          }
          alt={"Bizon"}
          width={500}
          height={500}
          className="absolute top-1/2 -translate-y-1/2 w-full h-full object-cover blur-xl -z-[1]"
        />
        <Image
          src={
            "https://media.istockphoto.com/id/165497033/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%80%E0%B8%87%E0%B8%B2%E0%B8%A7%E0%B8%B1%E0%B8%A7%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A3%E0%B8%B2%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B9%83%E0%B8%99%E0%B8%A0%E0%B8%B9%E0%B8%A1%E0%B8%B4%E0%B8%97%E0%B8%B1%E0%B8%A8%E0%B8%99%E0%B9%8C%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94.jpg?s=1024x1024&w=is&k=20&c=7RlJrK0e1oMk3jUNIkA5rZ7ojCQsZaXV1slsSKYb8C4="
          }
          alt={"Bizon"}
          width={500}
          height={500}
          className="p-6 object-contain z-[1] h-full w-full"
        />
      </div>
    </div>
  );
};

export default ImageCover;
