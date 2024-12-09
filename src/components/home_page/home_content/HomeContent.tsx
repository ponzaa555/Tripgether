import Hero from "./Hero";
import MyBackgroundSlider from "./BackgroundSlider";

export default function HomeContent() {
  return (
    <div className={`h-screen bg-cover bg-center pt-16`}>
      <MyBackgroundSlider />
      <div className="flex flex-col items-end mr-[9.5rem] mt-20 space-y-10">
        <Hero />
      </div>
    </div>
  );
}
