"use client";
import Image from "next/image";
import { useState } from "react";

const images = [
  "https://cdn.pixabay.com/photo/2024/03/04/10/20/ai-generated-8612174_1280.png",
  "https://cdn.pixabay.com/photo/2024/05/07/06/19/ai-generated-8744916_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/04/04/12/26/ai-generated-8675021_1280.png",
  "https://cdn.pixabay.com/photo/2024/03/08/09/47/ai-generated-8620359_1280.png",
  "https://cdn.pixabay.com/photo/2024/08/03/09/15/ai-generated-8941612_1280.jpg",
];

const ImageComponent = () => {
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
    <div className="flex flex-row">
      <div className="grid grid-cols-4 gap-4 p-4">
        {images.slice(0, 4).map((src, index) => {
          if (index === 3 && images.length > 4) {
            return (
              <div key={index} className="relative">
                <Image
                  src={src}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-24 object-cover cursor-pointer rounded-lg"
                  width={500}
                  height={500}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs font-bold rounded-lg text-center"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  + {images.length - 4} More
                </div>
              </div>
            );
          }
          return (
            <Image
              key={index}
              src={src}
              alt={`Thumbnail ${index}`}
              className="w-full h-24 object-cover cursor-pointer rounded-lg"
              onClick={() => setSelectedImageIndex(index)}
              width={500}
              height={500}
            />
          );
        })}
      </div>
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
    </div>
  );
};

export default ImageComponent;
