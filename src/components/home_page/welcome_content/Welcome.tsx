import Image from "next/image";
import { FEATURES } from "@/lib/frontend/data";
import { Button } from "@/components/ui/button";
import CoupleImage1 from "@/assets/images/couple-1.png";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 pt-20 gap-5 px-5 justify-items-center items-center">
        <Image
          src={CoupleImage1}
          alt="Honeymoon"
          width={1000}
          height={1000}
          quality={100}
          className="relative w-[15rem] h-[15rem] md:w-[25rem] md:h-[25rem] rounded-full"
        />
        <div className="flex flex-col text-left gap-5">
          <h3 className="text-sm text-orange-500 font-semibold leading-loose">
            HONEYMOON SPECIALS
          </h3>
          <h4 className="text-4xl font-semibold">
            Our Romantic Tropical Destinations
          </h4>
          <p>
            Discover serene beaches, lush landscapes, and luxurious retreats
            designed for your dream getaway.
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
