"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { createCompanySchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CreateCompanyForm() {
  const t = useTranslations("Company");
  const router = useRouter();
  const form = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      company_logo: "",
      company_name: "",
      owner_name: "",
      owner_lastname: "",
      vat_number: "",
      street: "",
      zip_code: "",
      city: "",
      country: "",
      owner_email: "",
      owner_phone: "",
      owner_website: "",
      bank_name: "",
      bank_account_number: "",
      bic_number: "",
      bank_name2: "",
      bank_account_number2: "",
      bic_number2: "",
    },
  });

  const { mutate: submit } = api.company.createCompany.useMutation({
    onSuccess: async () => {
      router.refresh();
      form.reset();
    },
  });
  function onSubmit(values: z.infer<typeof createCompanySchema>) {
    submit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="company_logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("company_logo")}</FormLabel>
              <FormControl>
                <Input placeholder={t("company_logo")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("company_name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("company_name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("owner_name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("owner_name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("owner_lastname")}</FormLabel>
              <FormControl>
                <Input placeholder={t("owner_lastname")} {...field} />
              </FormControl>
              <FormDescription>This is your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vat_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("vat_number")}</FormLabel>
              <FormControl>
                <Input placeholder={t("vat_number")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("street")}</FormLabel>
              <FormControl>
                <Input placeholder={t("street")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("zip_code")}</FormLabel>
              <FormControl>
                <Input placeholder={t("zip_code")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("city")}</FormLabel>
              <FormControl>
                <Input placeholder={t("city")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("country")}</FormLabel>
              <FormControl>
                <Input placeholder={t("country")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("owner_email")}</FormLabel>
              <FormControl>
                <Input placeholder={t("owner_email")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("owner_phone")}</FormLabel>
              <FormControl>
                <Input placeholder={t("owner_phone")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("owner_website")}</FormLabel>
              <FormControl>
                <Input placeholder={t("owner_website")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bank_name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("bank_name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bank_account_number")}</FormLabel>
              <FormControl>
                <Input placeholder={t("bank_account_number")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bic_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bic_number")}</FormLabel>
              <FormControl>
                <Input placeholder={t("bic_number")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_name2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bank_name2")}</FormLabel>
              <FormControl>
                <Input placeholder={t("bank_name2")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_account_number2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bank_account_number2")}</FormLabel>
              <FormControl>
                <Input placeholder={t("bank_account_number2")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bic_number2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bic_number2")}</FormLabel>
              <FormControl>
                <Input placeholder={t("bic_number2")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create User</Button>
      </form>
    </Form>
  );
}
