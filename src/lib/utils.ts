import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProfileProps } from "@/src/models/user/profile";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapProfileData(data: any): ProfileProps {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
    aboutMe: data.aboutMe,
  };
}

export function calDateDuration(stDate: string, endDate: string) {
  const start = new Date(stDate);
  const end = new Date(endDate);

  // Validate date
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date(s) provided.");
  }

  // Difference in milliseconds
  const diffInMs = end.getTime() - start.getTime();

  // Convert the difference to various units:
  // 1 day = 24 hours
  // 1 hour = 60 minutes
  // 1 minute = 60 seconds
  // 1 second = 1000 milliseconds

  let remaining = diffInMs;

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  return days
}

export const handleScroll = (id : string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const COLORS = ["#f4a261", "#2a9d8f", "#e76f51", "#264653", "#e9c46a", "#d62828", "#023e8a", "#0077b6", "#0096c7", "#00b4d8"]


export function connectionIdToColor(connectionId : number) : string{
  return COLORS[connectionId % COLORS.length]
}