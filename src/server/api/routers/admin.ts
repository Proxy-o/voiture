import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getAllCompany: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.settings.findMany();
  }),
});
