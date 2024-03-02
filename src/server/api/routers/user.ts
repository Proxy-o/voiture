import { Argon2id } from "oslo/password";
import { z } from "zod";
import { createClientSchema, createUserSchema } from "~/server/api/types";

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
              id: input.company_id,
            },
          },
        },
      });
    }),

  getClients: protectedProcedure
    .input(
      z.object({
        companyId: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.db.client.findMany({
        where: {
          compagny_id: input.companyId,
        },
      });
    }),
});
