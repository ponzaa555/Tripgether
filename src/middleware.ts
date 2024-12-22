// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   console.log("================ MiddleWare ==================");
//   const user = await getToken({
//     req: req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
//   if (user == null) {
//     return NextResponse.redirect(
//       new URL("http://localhost:3000/api/auth/signin")
//     );
//   }
// }
// export const config = {
//   matcher: "/profile/:path*", // Define which routes should use the middleware
// };
