import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createCarSchema } from "../types";
import { z } from "zod";

export const carRouter = createTRPCRouter({
  addCar: protectedProcedure
    .input(createCarSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.car.create({
        data: {
          chassis_number: input.chassis_number,
          brand: input.brand,
          model: input.model,
          car_type: input.car_type,
          transmission: input.transmission,
          first_registration: input.first_registration,
          mileage: input.mileage,
          engine_power: input.engine_power,
          cylinder: input.cylinder,
          fuel: input.fuel,
          co2: input.co2,
          color: input.color,
          number_keys: input.number_keys,
          cer_of_conf: input.cer_of_conf,
          inspection_form: input.inspection_form,
          car_pass: input.car_pass,
          register_cert: input.register_cert,
          settings: {
            connect: {
              id: Number(input.company_id),
            },
          },
        },
      });
    }),
  getCompanyCars: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return ctx.db.car.findMany({
        where: {
          compagny_id: input,
        },
      });
    }),
});
