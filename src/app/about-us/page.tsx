import Image from "next/image";
import { WHYUS } from "@/src/lib/frontend/data";
import MyCarousel from "@/src/components/aboutUs_page/MyCarousel";

const AboutUsPage = () => {
  return (
    <div className="flex flex-col gap-5 p-5 pt-24 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:items-center">
        <div className="w-full h-full">
          <Image
            src="/globemap.jpg"
            alt="globe map"
            width={1000}
            height={1000}
            className="rounded-3xl w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-black text-orange-400 text-center sm:text-left sm:text-lg">
            About US
          </h1>
          <h1 className="font-black text-2xl text-center sm:text-5xl sm:text-left">
            Make every travel moment count
          </h1>
          <p>
            <span className="font-black text-lg">'TripGether'</span> is a
            groundbreaking platform that aims to change the way people travel.
            Our wide array of services covers every part of a traveler's
            journey. Whether you're looking for inspiration, planning a trip,
            making reservations, or sharing your travel stories,{" "}
            <span className="font-black text-lg">'TripGether'</span> has
            everything you need.
            <br />
            <br />
            <span className="font-black text-lg">'TripGether'</span> also
            features a dynamic travel social network, connecting explorers from
            all over the globe. Share your travel stories, engage with other
            travelers, and get recommendations from a community that shares your
            love for travel. Capture and cherish every moment, creating memories
            that will last forever.
            <br />
            <br />
            Join <span className="font-black text-lg">'TripGether'</span> today
            and start a transformative travel journey, where inspiration,
            planning, booking, and social connections come together in one
            exceptional platform.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-full gap-5 py-10">
        <h2 className="font-black text-orange-400 text-xl">How it works</h2>
        <h2 className="font-black text-2xl text-center">
          TripGether Journey's Defination
        </h2>
        <MyCarousel />
      </div>
      <div className="relative w-full h-40 mt-10">
        <Image
          src="/banner.jpg"
          alt="banner holiday"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white font-black sm:text-xl lg:text-4xl">
            Let's Make Your Next Holiday Amazing
          </h2>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 pt-10">
        <h1 className="font-black text-xl text-orange-400 text-center sm:text-lg sm:text-left">
          TripGether
        </h1>
        <h1 className="font-black text-2xl text-center sm:text-4xl">
          Why travelers love TripGether
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 lg:gap-10 w-full px-5 sm:px-10 lg:px-40">
          {WHYUS.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={data.picture}
                alt={data.title}
                className="rounded-xl"
                width={300}
                height={200}
              />
              <h2 className="font-black text-base md:text-xl mt-4">
                {data.title}
              </h2>
              <ul className="pl-3 text-sm font-light mt-2">
                {data.listData.map((quote, subIndex) => (
                  <li
                    key={`${index}-${subIndex}`}
                    className="flex flex-row items-baseline gap-2"
                  >
                    <p className="text-4xl translate-y-2 text-slate-500">·</p>
                    <span className="text-wrap md:text-lg text-slate-500">
                      {quote}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
