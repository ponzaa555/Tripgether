"use client";
import { UploadFile } from "antd";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../UI/Button";

type ImageComponentProps = {
  images?: UploadFile<any>[];
  listUrl?: string[];
};

const ImageComponent = ({ images, listUrl }: ImageComponentProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const imageUrls = images
    ? images
        .map((image) => image.url)
        .filter((url): url is string => url !== undefined)
    : listUrl || [];

  const showPreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="flex flex-row">
      <div className="grid grid-cols-4 gap-2 pl-5 w-full">
        {imageUrls.slice(0, 4).map((src, index) => {
          if (index === 3 && imageUrls.length > 4) {
            return (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs font-bold rounded-lg"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  + {imageUrls.length - 4} More
                </div>
              </div>
            );
          }
          return (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <Image
                src={src}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover"
                onClick={() => setSelectedImageIndex(index)}
                width={500}
                height={500}
              />
            </div>
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
              src={imageUrls[selectedImageIndex]}
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
