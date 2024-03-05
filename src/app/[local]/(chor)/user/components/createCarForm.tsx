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
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Checkbox } from "~/components/ui/checkbox";
import { toast } from "sonner";

export default function CreateCarForm({ company_id }: { company_id: string }) {
  const t = useTranslations("Car");
  const m = useTranslations("Messages");
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
  const { mutate: submit } = api.car.addCar.useMutation();
  function onSubmit(values: z.infer<typeof createCarSchema>) {
    submit(
      {
        ...values,
      },
      {
        onSuccess: () => {
          toast.success(m("car_created"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col  p-2"
        >
          <h1 className="text-2xl font-bold">{t("create_car")}</h1>
          <div className="  flex-1 space-y-4  p-2">
            <Card className="grid grid-cols-2 gap-2 p-2 pb-4 shadow-md">
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
            </Card>
            <Card className="grid grid-cols-2 gap-2 p-2 pb-4 shadow-md">
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
                    <FormLabel className="w-1/2">
                      {t("first_registration")}
                    </FormLabel>
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engine_power"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-1/2">{t("engine_power")}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cylinder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-1/2">{t("cylinder")}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
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
            </Card>
            <Card className="grid grid-cols-2 gap-2 p-2 pb-4 shadow-md">
              <CustomField
                label={t("color")}
                name="color"
                control={form.control}
                placeholder={t("color")}
              />
              <FormField
                control={form.control}
                name="number_keys"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-1/2">{t("number_keys")}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cer_of_conf"
                render={({ field }) => (
                  <FormItem className="flex  items-center justify-center ">
                    <FormLabel
                      className={cn(
                        "relative w-full rounded-md border p-3",
                        field.value && "bg-secondary",
                      )}
                    >
                      {t("cer_of_conf")}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="  absolute bottom-2 right-1 z-50 size-6"
                        />
                      </FormControl>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inspection_form"
                render={({ field }) => (
                  <FormItem className="flex  items-center justify-center ">
                    <FormLabel
                      className={cn(
                        "relative w-full rounded-md border p-3",
                        field.value && "bg-secondary",
                      )}
                    >
                      {t("inspection_form")}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="absolute bottom-2 right-1 z-50 size-6"
                        />
                      </FormControl>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="car_pass"
                render={({ field }) => (
                  <FormItem className="flex  items-center justify-center ">
                    <FormLabel
                      className={cn(
                        "relative w-full rounded-md border p-3",
                        field.value && "bg-secondary",
                      )}
                    >
                      {t("car_pass")}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="absolute bottom-2 right-1 z-50 size-6"
                        />
                      </FormControl>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="register_cert"
                render={({ field }) => (
                  <FormItem className="flex  items-center justify-center ">
                    <FormLabel
                      className={cn(
                        "relative w-full rounded-md border p-3",
                        field.value && "bg-secondary",
                      )}
                    >
                      {t("register_cert")}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="absolute bottom-2 right-1 z-50 size-6"
                        />
                      </FormControl>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </div>
          <Button type="submit" className="w-full">
            {t("create_car")}{" "}
          </Button>
        </form>
      </Form>
    </>
  );
}
