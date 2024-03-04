import { Argon2id } from "oslo/password";
import { z } from "zod";
import {
  createCarSchema,
  createClientSchema,
  createInvoiceSchema,
  createUserSchema,
  updateUserSchema,
} from "~/server/api/types";

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
          username: input.username,
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

  getOne: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: input,
      },
      include: {
        compagny: true,
      },
    });
  }),
  getUserCompany: publicProcedure
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
