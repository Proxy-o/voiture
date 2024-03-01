import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { createCompanySchema } from "~/app/[local]/admin/types";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
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
});
