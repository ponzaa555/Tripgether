import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const handlerCreateUserInConvex = httpAction(async (ctx, req) => {
  console.log(req.json());
  console.log("Test Hello World");
  //   const body = await req.json();
  //   const user = await ctx.runQuery(internal.user.get, {
  //     nextAuthId: body.nextAuthId,
  //   });
  //   if (user) {
  //     console.log("User already exists in Convex");
  //   } else {
  //     await ctx.runMutation(internal.user.create, {
  //       username: body.username,
  //       imageUrl: body.imageUrl,
  //       nextAuthId: body.nextAuthId,
  //       email: body.email,
  //     });
  //     console.log("User created in Convex");
  //   }
  return new Response(null, { status: 200 });
});

const http = httpRouter();

http.route({
  path: "/api/createuser",
  method: "POST",
  handler: handlerCreateUserInConvex,
});

export default http;
