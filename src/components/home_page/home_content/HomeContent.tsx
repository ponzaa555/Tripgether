"use client";
import { Button } from "@/components/ui/button";
import MyBackgroundSlider from "@/components/home_page/home_content/BackgroundSlider";
import { Flame } from "lucide-react";
import Image from "next/image";
import RegisterDialog from "@/components/register/RegisterDialog";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function HomeContent() {
  const { data: session, status } = useSession();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  return (
    <div className="flex items-center h-screen bg-cover bg-center md:pt-40 lg:pt-0">
      <MyBackgroundSlider />
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full p-10 gap-10">
        <div className="flex flex-col items-start gap-10 p-2 rounded-md">
          <p className="text-4xl text-left font-black drop-shadow-lg text-white leading-relaxed">
            Welcome to TripGether <br />
            "Traveling together makes the journey unforgettable."
          </p>
          <p className="text-white drop-shadow-lg font-black text-xl hidden lg:block">
            Here, you will discover new experiences, exciting travel plans, and
            inspiration to explore the world. Let’s embark on this journey
            together! ✈️🌍
          </p>
          {status === "authenticated" && session?.user ? null : (
            <Button
              className="p-8 text-lg"
              onClick={() => {
                setIsRegisterDialogOpen(true);
              }}
            >
              <Flame />
              Register Now!!
            </Button>
          )}
        </div>
        <div className="hidden sm:block">
          <Image
            className="object-fill rounded-3xl backdrop-blur-sm shadow-2xl transform transition-transform duration-300 hover:scale-105"
            src="/home_img.jpg"
            alt="Home Image"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <RegisterDialog
        isOpen={isRegisterDialogOpen}
        setIsOpen={setIsRegisterDialogOpen}
      />
    </div>
  );
}
