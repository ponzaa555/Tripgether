import authOption from "@/src/lib/backend/authOption";
import {
  GetProfileById,
  UpsertProfile,
} from "@/src/lib/backend/myAuth/Command/profile/profile";
import { ProfileMap } from "@/src/lib/backend/myAuth/Command/profile/type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(" ================== getUserData Post ==================");
  const session = await getServerSession(authOption);
  const userId = session?.user.id as string;
  const info = await req.json();

  //map info To ProfileMap
  const profileMap: ProfileMap = {
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
    phoneNumber: info.phoneNumber,
    birthDate: info.birthDate,
    aboutMe: info.aboutMe,
    imageUrl: info.imageUrl,
  };
  const res = await UpsertProfile(profileMap, userId);
  return NextResponse.json({ profile: res }, { status: 201 });
}
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOption);
  if (!session)
    return NextResponse.json({ error: "Not authentication" }, { status: 401 });

  const profileDetail = await GetProfileById(session.user.email!);
  return NextResponse.json({ profileInfo: profileDetail }, { status: 200 });
}
