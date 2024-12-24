import groupPlanIcon from "@/src/assets/icons/groupPlan_Icon.png";
import chatIcon from "@/src/assets/icons/chat_Icon.png";
import planForm from "@/src/assets/icons/planForm_Icon.png";
import blogIcon from "@/src/assets/icons/blog_Icon.png";
import { StaticImageData } from "next/image";
import { title } from "process";

type Feature = {
  icon: StaticImageData;
  title: string;
  descrpition: string;
};

type AboutUs = {
  title: string;
  content: string;
};

type WhyUs = {
  title: string;
  listData: string[];
};

export const FEATURES: Feature[] = [
  {
    icon: groupPlanIcon,
    title: "Group Plan",
    descrpition:
      "ระบบการจัดการวางแผนแบบกลุ่มช่วยให้ทุกคนในกลุ่มสามารถร่วมกันจัดแผนได้",
  },
  {
    icon: chatIcon,
    title: "Chat",
    descrpition: "ระบบแชทสำหรับการสื่อสารภายในกลุ่มและการแจ้งเตือน",
  },
  {
    icon: planForm,
    title: "Planing Form",
    descrpition:
      "ฟอร์มสำหรับการวัดแผนการท่องเที่ยวสามารถปรับแผนได้อย่างอิสระและฟังก์ชันอื่นๆ",
  },
  {
    icon: blogIcon,
    title: "Blog",
    descrpition:
      "Blog สำหรับการรีวิวสถานที่ท่องเที่ยว เป็นชุมชนการแลกเปลี่ยนข้อมูล",
  },
] as const;

export const link = [
  {
    name: "Trip",
    href: "/trip",
  },
  {
    name: "Chat",
    href: "/chat",
  },
  {
    name: "Trip-Plan",
    href: "/plan",
  },
  {
    name: "About-Us",
    href: "/about-us",
  },
] as const;

export const blogMockData = [
  {
    id: 1,
    title: "Trip Enjoy The Moment1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl",
    author: "John Doe",
    image:
      "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
  },
  {
    id: 2,
    title: "Trip Enjoy The Moment2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl",
    author: "John Doe",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Trip Enjoy The Moment3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl",
    author: "John Doe",
    image:
      "https://ichef.bbci.co.uk/ace/standard/999/cpsprodpb/11979/production/_131075027_07.jpg",
  },
  {
    id: 4,
    title: "Trip Enjoy The Moment4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl",
    author: "John Doe",
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 5,
    title: "Trip Enjoy The Moment5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl",
    author: "John Doe",
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2014/01/animal-children-photography-elena-shumilova-2.jpg",
  },
  {
    id: 6,
    title: "Trip Enjoy The Moment6",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl",
    author: "John Doe",
    image:
      "https://img.freepik.com/free-photo/colorful-heart-air-balloon-shape-collection-concept-isolated-color-background-beautiful-heart-ball-event_90220-1047.jpg",
  },
  {
    id: 7,
    title: "Trip Enjoy The Moment7",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl",
    author: "John Doe",
    image:
      "https://wallpapers.com/images/featured/rainbow-pictures-povwnf60sljd1snu.jpg",
  },
  {
    id: 8,
    title: "Trip Enjoy The Moment8",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl",
    author: "John Doe",
    image:
      "https://imagedelivery.net/GUFM4Akk6JWzoEMVBlhEQw/a1d4a992-a9d0-4c9e-cd3e-a4e57b9ea800/w=300",
  },
  {
    id: 9,
    title: "Trip Enjoy The Moment9",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl",
    author: "John Doe",
    image:
      "https://imagedelivery.net/GUFM4Akk6JWzoEMVBlhEQw/9cbdba43-6c0b-4158-31a9-71f64714fa00/w=300",
  },
] as const;

export const ABOUTUS: AboutUs[] = [
  {
    title: "Get inspiration",
    content: "Enjoy travel inspiration's contents around the world.",
  },
  {
    title: "Create trip",
    content: "Plan you travel itinerary online with friends or on your own",
  },
  {
    title: "Travel",
    content: "Worry free, travel and enjoy your moment",
  },
  {
    title: "Memories",
    content:
      "Share your moments with travel community or just for you, access anytime",
  },
] as const;

export const WHYUS: WhyUs[] = [
  {
    title: "Simplified Travel Planning",
    listData: [
      "Smart tools for easy trip planning.",
      "Automated itinerary management.",
      "Hassle-free budget tracking.",
    ],
  },
  {
    title: "Seamless Communication",
    listData: [
      "Group chat for instant updates.",
      "Centralized trip details in one place.",
      "Real-time notifications for changes.",
    ],
  },
  {
    title: "Tailored Experiences",
    listData: [
      "Personalized trip suggestions.",
      "Flexible itineraries to suit your needs.",
      "Rewards for engaging with the platform.",
    ],
  },
] as const;
