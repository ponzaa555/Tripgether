import { api } from "@/convex/_generated/api";
import { Liveblocks } from "@liveblocks/node";
import { fetchMutation } from "convex/nextjs";
import { NextRequest, NextResponse } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export async function POST(req: NextRequest) {
  const { userId, roomId } = await req.json();

  const user = await fetchMutation(api.user.getUserById, {
    userId: userId.userId,
  });

  const userInfo = {
    name: user?.username || "Anonymous",
    picture: user?.imageUrl,
  };

  const session = liveblocks.prepareSession(user!.userId, {
    userInfo: userInfo,
  });

  session.allow(roomId.roomId, session.FULL_ACCESS);
  const sessionAuthor = await session.authorize();

  console.log({ sessionAuthor });
  const { status, body } = sessionAuthor;

  return new NextResponse(body, { status: status });
}
