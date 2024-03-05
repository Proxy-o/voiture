import { createCompanySchema } from "~/server/api/types";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const companyRouter = createTRPCRouter({
  createCompany: protectedProcedure
    .input(createCompanySchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.settings.create({
        data: {
          company_logo: input.company_logo,
          company_name: input.company_name,
          owner_name: input.owner_name,
          owner_lastname: input.owner_lastname,
          vat_number: input.vat_number,
          street: input.street,
          zip_code: input.zip_code,
          city: input.city,
          country: input.country,
          owner_email: input.owner_email,
          owner_phone: input.owner_phone,
          owner_website: input.owner_website,
          bank_name: input.bank_name,
          bank_account_number: input.bank_account_number,
          bic_number: input.bic_number,
          bank_name2: input.bank_name2,
          bank_account_number2: input.bank_account_number2,
          bic_number2: input.bic_number2,
        },
      });
    }),
  getClients: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return ctx.db.client.findMany({
        where: {
          compagny_id: input,
        },
      });
    }),
});
