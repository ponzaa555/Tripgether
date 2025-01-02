"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/src/components/UI/carousel";
import { ABOUTUS } from "@/src/lib/frontend/data";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/src/components/UI/card";

type Props = {};

const MyCarousel = (props: Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState);
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className="flex flex-col gap-5 items-center w-full h-full">
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {ABOUTUS.map((data, index) => (
            <CarouselItem key={index} className="md:basis-1/3">
              <div className="p-1">
                <Card className="shadow-md select-none">
                  <CardContent className="flex flex-row w-full h-32 justify-center items-center gap-5 p-6">
                    <p className="bg-orange-400 text-white p-2 rounded-full">
                      {index + 1}
                    </p>
                    <div className="flex flex-col">
                      <h2 className="font-black">{data.title}</h2>
                      <p className="font-thin text-sm text-slate-400">
                        {data.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-orange-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCarousel;
