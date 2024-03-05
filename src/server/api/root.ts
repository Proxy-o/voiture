import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { companyRouter } from "./routers/company";
import { carRouter } from "./routers/car";
import { clientRouter } from "./routers/client";
import { invoiceRouter } from "./routers/invoice";
import { adminRouter } from "./routers/admin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  company: companyRouter,
  car: carRouter,
  client: clientRouter,
  invoice: invoiceRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
