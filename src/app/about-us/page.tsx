"use client";

import { Card, CardContent } from "@/src/components/UI/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/src/components/UI/carousel";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";
import { ABOUTUS } from "@/src/lib/frontend/data";
import { useEffect, useState } from "react";

type Props = {};

const AboutUsPage = (props: Props) => {
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
    <div className="flex flex-col items-center gap-5 p-5">
      <Image
        src="/globemap.jpg"
        alt="globe map"
        width={1000}
        height={1000}
        className="rounded-3xl"
      />
      <h1 className="font-black text-orange-400">About US</h1>
      <h1 className="font-black text-2xl text-center">
        Make every travel moment count
      </h1>
      <p>
        <span className="font-black text-lg">'TripGether'</span> is an
        innovative platform designed to revolutionize the way people experience
        travel. Our comprehensive range of services caters to every aspect of
        the traveler's journey. Whether you're seeking inspiration, planning a
        trip, making bookings, or sharing your adventures,{" "}
        <span className="font-black text-lg">'TripGether'</span> has you
        covered.
        <br />
        <br />
        <span className="font-black text-lg">'TripGether'</span> also offers a
        vibrant travel social network, connecting like-minded explorers from
        around the world. Share your travel experiences, interact with fellow
        travelers, and seek recommendations from a community that shares your
        passion. Every moment can be captured and cherished, preserving memories
        that will last a lifetime.
        <br />
        <br />
        Join <span className="font-black text-lg">'TripGether'</span> today and
        embark on a transformative travel experience, where inspiration,
        planning, booking, and social connections seamlessly come together in
        one exceptional platform.
      </p>
      <div className="flex flex-col items-center gap-5 py-10">
        <h2 className="font-black text-orange-400 text-xl">How it works</h2>
        <h2 className="font-black text-2xl text-center">
          TripGether Journey's Defination
        </h2>
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
          className="w-full max-w-xs"
        >
          <CarouselContent>
            {ABOUTUS.map((data, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="shadow-md border-none select-none">
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
      <div className="flex flex-col items-center gap-5">
        <h1 className="font-black text-xl text-orange-400">TripGether</h1>
        <h1 className="font-black text-2xl text-center">
          Why travelers love TripGether
        </h1>
        <h2>Simplified Travel Planning</h2>
        <ul className="list-disc list-inside">
          <li>Smart tools for easy trip planning.</li>
          <li>Automated itinerary management.</li>
          <li>Hassle-free budget tracking.</li>
        </ul>
        <h2>Seamless Communication</h2>
        <ul className="list-disc list-inside">
          <li>Group chat for instant updates.</li>
          <li>Centralized trip details in one place.</li>
          <li>Real-time notifications for changes.</li>
        </ul>
        <h2>Tailored Experiences</h2>
        <ul className="list-disc list-inside">
          <li>Personalized trip suggestions.</li>
          <li>Flexible itineraries to suit your needs.</li>
          <li>Rewards for engaging with the platform.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUsPage;
