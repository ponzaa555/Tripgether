import {
  CheckPassword,
  FindUserByEmail,
} from "@/lib/backend/myAuth/Command/Login";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("====================   Login   =============");
  var body = await req.json();
  const { email, password } = body;

  // Find User
//   console.log("email : ",email);
  var user = await FindUserByEmail(email);
  if (!user)
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );

  // checkPassword
  var checkPassword = await CheckPassword(password, user.password);
  if (!checkPassword)
    return NextResponse.json(
      {
        error: "Invalid credentials",
        message: "Email or password is incorrect",
      },
      { status: 401 }
    );

  return NextResponse.json(
    {
      user: user,
      message: "Login successful",
    },
    { status: 200 }
  );
}
