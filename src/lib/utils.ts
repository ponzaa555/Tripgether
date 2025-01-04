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
