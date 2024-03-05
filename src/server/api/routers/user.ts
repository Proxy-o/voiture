import { Argon2id } from "oslo/password";
import { z } from "zod";
import { createUserSchema, updateUserSchema } from "~/server/api/types";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx }) => {
      const hashedPassword = await new Argon2id().hash(input.password);
      return ctx.db.user.create({
        data: {
          username: input.username,
          password: hashedPassword,
          email: input.email,
          is_admin: input.is_admin,
          compagny: {
            connect: {
              id: input.compagnyId,
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(z.object({ id: z.number(), data: updateUserSchema }))
    .mutation(async ({ input, ctx }) => {
      // if password is updated, hash it
      if (input.data.password) {
        input.data.password = await new Argon2id().hash(input.data.password);
      }
      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...input.data,
        },
      });
    }),

  getOne: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: input,
      },
      include: {
        compagny: true,
      },
    });
  }),
  getUserCompany: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input,
        },
        select: {
          compagny: true,
        },
      });
    }),
});
