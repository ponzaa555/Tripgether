"use client";
import { RiEditCircleLine } from "react-icons/ri";
import { BiTrip } from "react-icons/bi";
import { SlPicture } from "react-icons/sl";
import { useState } from "react";
import Image from "next/image";
import { FaRegCreditCard } from "react-icons/fa6";

type NavbarComponentProps = {
  images: string[];
};

const NavbarComponent = ({ images }: NavbarComponentProps) => {
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
    <div className="flex flex-col py-8 px-4 items-center gap-10 h-full border-r border-gray-300 pt-20">
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
        className="flex flex-col gap-2 w-full justify-center items-center p-2 rounded-2xl bg-teal-500 border-transparent cursor-pointer"
        onClick={() => scrollToSection("overview")}
      >
        <RiEditCircleLine size={30} color="white" />
        <p className="font-black text-white text-xs">Overview</p>
      </div>
      <div
        className="flex flex-col gap-2 w-full justify-center items-center p-2 rounded-2xl bg-orange-500 border-transparent cursor-pointer"
        onClick={() => scrollToSection("tripgether")}
      >
        <BiTrip size={30} color="white" />
        <p className="font-black text-white text-xs">Tripgether</p>
      </div>
      <div
        className="flex flex-col gap-2 w-full justify-center items-center p-2 rounded-2xl bg-teal-500 border-transparent cursor-pointer"
        onClick={() => scrollToSection("expense")}
      >
        <FaRegCreditCard size={30} color="white" />
        <p className="font-black text-white text-xs">Expense</p>
      </div>
      <div
        className="flex flex-col gap-2 w-full justify-center items-center p-2 rounded-2xl bg-orange-500 border-transparent cursor-pointer"
        onClick={() => setSelectedImageIndex(0)}
      >
        <SlPicture size={30} color="white" />
        <p className="font-black text-white text-xs">Media</p>
      </div>
    </div>
  );
};

export default NavbarComponent;
