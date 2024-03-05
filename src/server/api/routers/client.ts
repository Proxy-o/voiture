import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createClientSchema } from "../types";
import { z } from "zod";

export const clientRouter = createTRPCRouter({
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
          phone_number: input.phone_number,
          mobile_number: input.mobile_number,
          settings: {
            connect: {
              id: Number(input.company_id),
            },
          },
        },
      });
    }),
  getCompanyClients: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return ctx.db.client.findMany({
        where: {
          compagny_id: input,
        },
      });
    }),
});
