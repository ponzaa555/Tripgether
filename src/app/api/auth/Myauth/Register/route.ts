import { FindUserByEmail } from "@/src/lib/backend/myAuth/Command/Login";
import { CreateUser } from "@/src/lib/backend/myAuth/Command/Register";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("====================   Register   =============");
  var body = await req.json();
  const { email, password, confirmPassword } = body;

  var user = await FindUserByEmail(email);
  
  // email already exists
  if (user)
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 401 }
    );
  // create user
  var newUser = await CreateUser(email, password);
  return NextResponse.json(newUser, { status: 201 });
}
