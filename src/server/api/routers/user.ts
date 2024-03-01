import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { z } from "zod";
import { createUserSchema } from "~/app/[local]/(company)/admin/types";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx }) => {
      const hashedPassword = await new Argon2id().hash(input.password);
      return ctx.db.user.create({
        data: {
          name: input.name,
          password: hashedPassword,
          email: input.email,
          compagny: {
            connect: {
              id: input.compagnyId,
            },
          },
        },
      });
    }),

  // addClient: protectedProcedure
  //   .input(
  //     z.object({
  //       userId: z.string(),
  //       name: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     return ctx.db.client.create({
  //       data: {
  //         name: input.name,
  //         users: {
  //           connect: {
  //             id: input.userId,
  //           },
  //         },
  //       },
  //     });
  //   }),

  // getClients: protectedProcedure
  //   .input(
  //     z.object({
  //       userId: z.string(),
  //     }),
  //   )
  //   .query(async ({ input, ctx }) => {
  //     return ctx.db.client.findMany({
  //       where: {
  //         users: {
  //           some: {
  //             id: input.userId,
  //           },
  //         },
  //       },
  //     });
  //   }),
});
