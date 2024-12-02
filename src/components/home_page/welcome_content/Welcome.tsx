import Image from "next/image";
import ImageWelcome from "./ImageWelcome";
import { FEATURES } from "@/lib/frontend/data";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <div className="text-center pt-10 px-48 pb-40">
      <h3 className="text-sm text-orange-500">WELCOME</h3>
      <h3 className="text-4xl mt-3">We Offer Best Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex flex-col items-center rounded-md p-8 ${
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
              <div className="absolute w-20 bg-orange-600 h-20 -left-7 -bottom-5 rounded-[1.5rem] -z-50"></div>
            )}
            <h4>{feature.title}</h4>
            <p className="text-sm text-slate-500 text-center">
              {feature.descrpition}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-32">
        <div className="grid grid-cols-2">
          <ImageWelcome />
          <div className="flex flex-col text-left">
            <h3 className="text-sm text-orange-500 font-semibold leading-loose">
              HONEYMOON SPECIALS
            </h3>
            <h4 className="text-4xl font-semibold">
              Our Romantic Tropical Destinations
            </h4>
            <p>
              Et labore harum non nobis ipsum eum molestias mollitia et corporis
              praesentium a laudantium internos. Non quis eius quo eligendi
              corrupti et fugiat nulla qui soluta recusandae in maxime quasi aut
              ducimus illum aut optio quibusdam!
            </p>
            <Button>
            <Button>
              <p className="m-0">View</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
