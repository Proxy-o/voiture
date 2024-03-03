import { Argon2id } from "oslo/password";
import { z } from "zod";
import {
  createCarSchema,
  createClientSchema,
  createInvoiceSchema,
  createUserSchema,
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

  addInvoice: protectedProcedure
    .input(createInvoiceSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.invoice.create({
        data: {
          client: {
            connect: {
              id: Number(input.client_id),
            },
          },
          car: {
            connect: {
              id: Number(input.car_id),
            },
          },
          settings: {
            connect: {
              id: Number(input.company_id),
            },
          },
          date: input.date,
          due_date: input.due_date,
          advance: input.advance,
          amount: input.amount,
          payment_method: input.payment_method,
          paid_status: input.paid_status,
          memo: input.memo,
        },
      });
    }),
});
