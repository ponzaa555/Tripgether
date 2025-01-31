import Image from "next/image";

type Props = { coverImage?: string };

const ImageCover = ({ coverImage }: Props) => {
  return (
    <div className="relative flex flex-col h-[400px] gap-5 items-center w-full">
      <div className="flex justify-center w-full relative overflow-hidden h-[400px]">
        <Image
          src={
            coverImage ||
            "https://www.huber-online.com/daisy_website_files/product_img/no-image.jpg"
          }
          alt={"Bizon"}
          width={500}
          height={500}
          className="absolute top-1/2 -translate-y-1/2 w-full h-full object-cover blur-xl -z-[1]"
        />
        <Image
          src={
            coverImage ||
            "https://www.huber-online.com/daisy_website_files/product_img/no-image.jpg"
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
