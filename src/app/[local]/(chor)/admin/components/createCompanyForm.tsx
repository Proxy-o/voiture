"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { createCompanySchema } from "../../../../../server/api/types";
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
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CustomField from "./customFiled";
import { Card } from "~/components/ui/card";
import { UploadButton, UploadDropzone } from "~/components/uploadthing";
import { Input } from "~/components/ui/input";

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
        <div className="flex flex-col items-center gap-2   p-2">
          <Card className="flex min-w-full flex-col gap-6 p-6">
            <p className="text-2xl">{t("company_info")}</p>
            <p className="">logo</p>

            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res[0]);
                // set the the value of the logo
                form.setValue("company_logo", res[0]!.url);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
            <CustomField
              control={form.control}
              name="company_name"
              label={t("company_name")}
              placeholder={t("company_name")}
            />
            <div className="flex w-full gap-2 ">
              <CustomField
                control={form.control}
                name="owner_name"
                label={t("owner_name")}
                placeholder={t("owner_name")}
              />
              <CustomField
                control={form.control}
                name="owner_lastname"
                label={t("owner_lastname")}
                placeholder={t("owner_lastname")}
              />
            </div>
          </Card>

          <Card className="flex min-w-full flex-col gap-6 p-6">
            <p>{t("address_info")}</p>
            <CustomField
              control={form.control}
              name="street"
              label={t("street")}
              placeholder={t("street")}
            />
            <CustomField
              control={form.control}
              name="zip_code"
              label={t("zip_code")}
              placeholder={t("zip_code")}
            />
            <div className="flex w-full gap-2 ">
              <CustomField
                control={form.control}
                name="city"
                label={t("city")}
                placeholder={t("city")}
              />
              <CustomField
                control={form.control}
                name="country"
                label={t("country")}
                placeholder={t("country")}
              />
            </div>
          </Card>
          <Card className="flex min-w-full flex-col gap-6 p-6 ">
            <p>{t("contact_info")}</p>
            <CustomField
              control={form.control}
              name="owner_email"
              label={t("owner_email")}
              placeholder={t("owner_email")}
            />
            <CustomField
              control={form.control}
              name="owner_phone"
              label={t("owner_phone")}
              placeholder={t("owner_phone")}
            />
            <CustomField
              control={form.control}
              name="owner_website"
              label={t("owner_website")}
              placeholder={t("owner_website")}
            />
          </Card>

          <Card className="flex min-w-full flex-col gap-6 p-6">
            <CustomField
              control={form.control}
              name="vat_number"
              label={t("vat_number")}
              placeholder={t("vat_number")}
            />
          </Card>
          <Card className="flex min-w-full flex-col gap-6 p-6">
            <p>{t("bank_info")}</p>
            <CustomField
              control={form.control}
              name="bank_name"
              label={t("bank_name")}
              placeholder={t("bank_name")}
            />
            <CustomField
              control={form.control}
              name="bank_account_number"
              label={t("bank_account_number")}
              placeholder={t("bank_account_number")}
            />
            <CustomField
              control={form.control}
              name="bic_number"
              label={t("bic_number")}
              placeholder={t("bic_number")}
            />
          </Card>
          <Card className="flex min-w-full flex-col gap-6 p-6">
            <p>{t("bank_info2")}</p>
            <CustomField
              control={form.control}
              name="bank_name2"
              label={t("bank_name2")}
              placeholder={t("bank_name2")}
            />
            <CustomField
              control={form.control}
              name="bank_account_number2"
              label={t("bank_account_number2")}
              placeholder={t("bank_account_number2")}
            />
            <CustomField
              control={form.control}
              name="bic_number2"
              label={t("bic_number2")}
              placeholder={t("bic_number2")}
            />
          </Card>
        </div>
        <Button type="submit" className="w-full">
          {t("create_company")}
        </Button>
      </form>
    </Form>
  );
}
