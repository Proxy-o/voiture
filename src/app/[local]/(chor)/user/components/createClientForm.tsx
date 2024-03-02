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
import { createClientSchema } from "~/server/api/types";
import CustomField from "../../admin/components/customFiled";
import { type User } from "lucia";
import { useTranslations } from "next-intl";

export default function CreateClientForm({
  company_id,
}: {
  company_id: string;
}) {
  const t = useTranslations("Client");

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      is_company: false,
      surname: "",
      firstname: "",
      company_name: "",
      btw_number: "",
      street: "",
      postal_code: "",
      city: "",
      country: "",
      email: "",
      phone: "",
      mobile: "",
    },
  });

  const { mutate: submit } = api.user.addClient.useMutation();

  function onSubmit(values: z.infer<typeof createClientSchema>) {
    submit({
      ...values,
      company_id,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={"is_company"}
          render={({ field }) => (
            <FormItem className="flex w-full items-center justify-start">
              <FormLabel className="w-1/2">{t("is_company")}</FormLabel>
              <FormControl>
                <Input
                  type="checkbox"
                  {...field}
                  value={field.value.toString()}
                  className="w-full"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <CustomField
          label={t("surname")}
          name="surname"
          control={form.control}
          placeholder={t("surname")}
        />
        <CustomField
          label={t("first_name")}
          name="firstname"
          control={form.control}
          placeholder={t("first_name")}
        />
        <CustomField
          label={t("company_name")}
          name="company_name"
          control={form.control}
          placeholder={t("company_name")}
        />
        <CustomField
          label={t("btw_number")}
          name="btw_number"
          control={form.control}
          placeholder={t("btw_number")}
        />
        <CustomField
          label={t("street")}
          name="street"
          control={form.control}
          placeholder={t("street")}
        />
        <CustomField
          label={t("postal_code")}
          name="postal_code"
          control={form.control}
          placeholder={t("postal_code")}
        />
        <CustomField
          label={t("city")}
          name="city"
          control={form.control}
          placeholder={t("city")}
        />
        <CustomField
          label={t("country")}
          name="country"
          control={form.control}
          placeholder={t("country")}
        />
        <CustomField
          label={t("email")}
          name="email"
          control={form.control}
          placeholder={t("email")}
        />
        <CustomField
          label={t("phone")}
          name="phone"
          control={form.control}
          placeholder={t("phone")}
        />
        <CustomField
          label={t("mobile")}
          name="mobile"
          control={form.control}
          placeholder={t("mobile")}
        />

        {/* <FormField
          control={form.control}
          name={"company_id"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  // value={Number(company?.compagny?.id)}
                  className=" w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">{t("create_client")}</Button>
      </form>
    </Form>
  );
}
