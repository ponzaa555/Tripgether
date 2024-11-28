"use client";
import BackgroundSlider from "react-background-slider";

export default function MyBackgroundSlider() {
  return (
    <BackgroundSlider
      images={["/background_1.jpg", "/background_2.jpg", "/background_3.jpg"]}
      duration={10}
      transition={2}
    />
  );
}
