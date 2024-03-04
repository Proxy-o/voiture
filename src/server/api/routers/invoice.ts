import { createInvoiceSchema } from "~/server/api/types";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const invoiceRouter = createTRPCRouter({
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

  getInvoice: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return ctx.db.invoice.findUnique({
        where: {
          id: input,
        },
        include: {
          client: true,
          car: true,
          settings: true,
        },
      });
    }),
  getAllInvoices: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return ctx.db.invoice.findMany({
        where: {
          settings: {
            id: input,
          },
        },
        include: {
          client: true,
          car: true,
          settings: true,
        },
      });
    }),
});
