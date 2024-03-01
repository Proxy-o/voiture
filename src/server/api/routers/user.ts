import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        type: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.db.user.findFirst({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          type: true,
          clients: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const hashedPassword = await new Argon2id().hash(input.password);
      const userId = generateId(15);
      return ctx.db.user.create({
        data: {
          id: userId,
          username: input.username,
          hashed_password: hashedPassword,
          email: input.email,
        },
      });
    }),

  addClient: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.client.create({
        data: {
          name: input.name,
          users: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),

  getClients: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.db.client.findMany({
        where: {
          users: {
            some: {
              id: input.userId,
            },
          },
        },
      });
    }),
});
