import Image from "next/image";
import { FEATURES } from "@/src/lib/frontend/data";
import { Button } from "@/src/components/UI/Button";
import CoupleImage1 from "@/src/assets/images/couple-1.jpg";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center gap-5 py-10 px-5 sm:pt-20 md:pt-60 lg:pt-12">
      <h3 className="text-sm font-black text-orange-500">WELCOME</h3>
      <h3 className="text-xl font-black pt-3">We Offer Best Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex flex-col items-center rounded-md p-10 ${
              index === 1 && "shadow-md rounded-[2.5rem] relative bg-white"
            }`}
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              quality={100}
              style={
                index === 0
                  ? { width: 85, height: 65 }
                  : { width: 65, height: 65 }
              }
              className="relative z-10"
            />
            {index === 1 && (
              <div className="absolute w-20 font-black bg h-20 -left-7 -bottom-5 rounded-[1.5rem] -z-50"></div>
            )}
            <h4>{feature.title}</h4>
            <p className="text-sm text-slate-500 text-center">
              {feature.descrpition}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 py-4 mt-20 gap-5 px-4 md:px-16 md:py-16 justify-items-center items-center bg-gradient-to-b from-slate-100 rounded-xl lg:px-20 lg:py-20">
        <Image
          src={CoupleImage1}
          alt="Honeymoon"
          width={1500}
          height={1500}
          className="relative w-full h-full rounded-2xl object-cover shadow-xl"
        />
        <div className="flex flex-col gap-5 text-center">
          <h3 className="text-sm lg:text-lg text-orange-500 font-semibold leading-loose">
            HONEYMOON SPECIALS
          </h3>
          <h4 className="text-3xl lg:text-4xl font-semibold">
            Our Romantic Tropical Destinations
          </h4>
          <p className="text-slate-500 text-left text-sm md:text-base lg:text-xl">
            Discover your next dream destination! ✈️ Whether you're looking for
            breathtaking beaches, hidden gems, or vibrant city escapes,
            TripGether has everything you need to plan the perfect trip. Start
            your adventure today—visit TripGether now!
          </p>
          <Button
            onClick={() => {
              router.push("/trip");
            }}
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
}
