"use client";
import { RiEditCircleLine } from "react-icons/ri";
import { BiTrip } from "react-icons/bi";
import { SlPicture } from "react-icons/sl";
import { useState } from "react";
import Image from "next/image";

const images = [
  "https://cdn.pixabay.com/photo/2024/03/04/10/20/ai-generated-8612174_1280.png",
  "https://cdn.pixabay.com/photo/2024/05/07/06/19/ai-generated-8744916_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/04/04/12/26/ai-generated-8675021_1280.png",
  "https://cdn.pixabay.com/photo/2024/03/08/09/47/ai-generated-8620359_1280.png",
  "https://cdn.pixabay.com/photo/2024/08/03/09/15/ai-generated-8941612_1280.jpg",
];

const NavbarComponent = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const showPreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="flex flex-col py-10 px-8 items-center gap-5">
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedImageIndex(null)}
          >
            ✖
          </button>
          <button
            className="absolute left-4 text-white text-3xl bg-gray-700 bg-opacity-50 px-4 py-2 rounded-full"
            onClick={showPreviousImage}
          >
            ←
          </button>
          {selectedImageIndex !== null && (
            <Image
              src={images[selectedImageIndex]}
              alt="Selected"
              className="max-w-full max-h-full mx-4"
              width={500}
              height={500}
            />
          )}
          <button
            className="absolute right-4 text-white text-3xl bg-gray-700 bg-opacity-50 px-4 py-2 rounded-full"
            onClick={showNextImage}
          >
            →
          </button>
        </div>
      )}
      <div
        className="flex flex-col gap-2 w-full justify-center items-center p-2 rounded-2xl bg-teal-400 border-transparent cursor-pointer"
        onClick={() => scrollToSection("overview")}
      >
        <RiEditCircleLine size={40} color="white" />
        <p className="font-black text-white">Overview</p>
      </div>
      <div
        className="flex flex-col gap-2 w-full justify-center items-center p-2 rounded-2xl bg-orange-400 border-transparent cursor-pointer"
        onClick={() => scrollToSection("tripgether")}
      >
        <BiTrip size={40} color="white" />
        <p className="font-black text-white">Tripgether</p>
      </div>
      <div
        className="flex flex-col gap-2 w-full justify-center items-center p-2 rounded-2xl bg-pink-600 border-transparent cursor-pointer"
        onClick={() => setSelectedImageIndex(0)}
      >
        <SlPicture size={40} color="white" />
        <p className="font-black text-white">Media</p>
      </div>
    </div>
  );
};

export default NavbarComponent;
