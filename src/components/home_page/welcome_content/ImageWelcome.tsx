import Image from "next/image";
import frame from "@/assets/images/frame.png";
import couple_1 from "@/assets/images/couple-1.png";
import couple_2 from "@/assets/images/couple-2.png";
import couple_3 from "@/assets/images/couple-3.png";

export default function ImageWelcome() {
  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      className="flex justify-center"
    >
      <Image
        src={couple_1}
        alt="picture couple"
        style={{ width: 250, height: 400, position: "absolute", zIndex: 1 }}
      />
      <Image
        src={frame}
        alt="picture couple"
        style={{
          width: 250,
          height: 400,
          position: "absolute",
          zIndex: -1,
        }}
        className="translate-x-3 -translate-y-3"
      />
      <Image
        src={couple_2}
        alt="picture couple"
        style={{ width: 135, height: 135, position: "absolute", zIndex: 1 }}
        className="-translate-x-28 -translate-y-10"
      />
      <Image
        src={couple_3}
        alt="picture couple"
        style={{ width: 200, height: 200, position: "absolute", zIndex: 1 }}
        className="-translate-x-40 translate-y-24"
      />
    </div>
  );
}
