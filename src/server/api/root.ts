import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { companyRouter } from "./routers/company";
import { carRouter } from "./routers/car";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  company: companyRouter,
  car: carRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
