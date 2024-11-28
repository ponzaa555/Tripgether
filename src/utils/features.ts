import groupPlanIcon from "@/assets/icons/groupPlan_Icon.png";
import chatIcon from "@/assets/icons/chat_Icon.png";
import planForm from "@/assets/icons/planForm_Icon.png";
import blogIcon from "@/assets/icons/blog_Icon.png";
import { StaticImageData } from "next/image";

type Feature = {
  icon: StaticImageData;
  title: string;
  descrpition: string;
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
