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

  addClient: protectedProcedure
    .input(createClientSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.client.create({
        data: {
          is_company: input.is_company,
          surname: input.surname,
          firstname: input.firstname,
          company_name: input.company_name,
          btw_number: input.btw_number,
          street: input.street,
          postal_code: input.postal_code,
          city: input.city,
          country: input.country,
          email: input.email,
          phone_number: input.phone,
          mobile_number: input.mobile,
          settings: {
            connect: {
              id: Number(input.company_id),
            },
          },
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
