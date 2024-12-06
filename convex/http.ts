import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const validatePayload = async (req: Request) => {};

// const handlerNextAuth = httpAction(async (ctx, req) => {
//   const event = await validatePayload(req);
//   if (!event) {
//     return new Response("Could not validate Auth payload", {
//       status: 400,
//     });
//   }
// });

const http = httpRouter();

// http.route({
//   path: "",
//   method: "POST",
//   handler: handlerNextAuth,
// });

export default http;
