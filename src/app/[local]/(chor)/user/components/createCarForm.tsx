"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import CustomField from "../../admin/components/customFiled";
import { useTranslations } from "next-intl";
import { createCarSchema } from "~/server/api/types";

export default function CreateCarForm({ company_id }: { company_id: string }) {
  const t = useTranslations("Car");
  const form = useForm<z.infer<typeof createCarSchema>>({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      company_id,
      chassis_number: "",
      brand: "",
      model: "",
      car_type: "",
      transmission: "",
      mileage: 0,
      engine_power: 0,
      cylinder: 0,
      first_registration: new Date(),
      fuel: "",
      co2: "",
      color: "",
      number_keys: 0,
      cer_of_conf: false,
      inspection_form: false,
      car_pass: false,
      register_cert: false,
    },
  });
  const { mutate: submit } = api.user.addCar.useMutation();
  function onSubmit(values: z.infer<typeof createCarSchema>) {
    submit({
      ...values,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomField
          label={t("chassis_number")}
          name="chassis_number"
          control={form.control}
          placeholder={t("chassis_number")}
        />
        <CustomField
          label={t("brand")}
          name="brand"
          control={form.control}
          placeholder={t("brand")}
        />
        <CustomField
          label={t("model")}
          name="model"
          control={form.control}
          placeholder={t("model")}
        />
        <CustomField
          label={t("car_type")}
          name="car_type"
          control={form.control}
          placeholder={t("car_type")}
        />
        <CustomField
          label={t("transmission")}
          name="transmission"
          control={form.control}
          placeholder={t("transmission")}
        />
        <FormField
          control={form.control}
          name={"first_registration"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-1/2">{t("first_registration")}</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value.toString()}
                  className="w-full"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"mileage"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-1/2">{t("mileage")}</FormLabel>
              <FormControl>
                <Input type="number" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomField
          label={t("engine_power")}
          name="engine_power"
          control={form.control}
          placeholder={t("engine_power")}
        />
        <CustomField
          label={t("cylinder")}
          name="cylinder"
          control={form.control}
          placeholder={t("cylinder")}
        />
        <CustomField
          label={t("fuel")}
          name="fuel"
          control={form.control}
          placeholder={t("fuel")}
        />
        <CustomField
          label={t("co2")}
          name="co2"
          control={form.control}
          placeholder={t("co2")}
        />
        <CustomField
          label={t("color")}
          name="color"
          control={form.control}
          placeholder={t("color")}
        />
        <CustomField
          label={t("number_keys")}
          name="number_keys"
          control={form.control}
          placeholder={t("number_keys")}
        />
        <CustomField
          label={t("cer_of_conf")}
          name="cer_of_conf"
          control={form.control}
          placeholder={t("cer_of_conf")}
        />
        <CustomField
          label={t("inspection_form")}
          name="inspection_form"
          control={form.control}
          placeholder={t("inspection_form")}
        />
        <CustomField
          label={t("car_pass")}
          name="car_pass"
          control={form.control}
          placeholder={t("car_pass")}
        />
        <CustomField
          label={t("register_cert")}
          name="register_cert"
          control={form.control}
          placeholder={t("register_cert")}
        />
        <Button type="submit">{t("create_car")}</Button>
      </form>
    </Form>
  );
}
