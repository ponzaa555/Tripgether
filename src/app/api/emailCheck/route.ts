import { FindUserByEmail } from "@/src/lib/backend/myAuth/Command/Login";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  var body = await req.json();
  const { email } = body;

  var user = await FindUserByEmail(email);
  if (!user)
    return NextResponse.json(
      { message: "Can not find a user email" },
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
