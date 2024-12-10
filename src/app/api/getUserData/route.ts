import {
  FindUserByEmail,
  FindUserById,
} from "@/lib/backend/myAuth/Command/Login";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  var body = await req.json();
  const { id } = body;

  var user = await FindUserById(id);
  if (!user)
    return NextResponse.json(
      { message: "Can not find a user id" },
      { status: 404 }
    );

  return NextResponse.json(
    {
      user: user,
      message: "User found",
    },
    { status: 200 }
  );
}
