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
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { createClientSchema } from "~/server/api/types";
import CustomField from "../../admin/components/customFiled";
import { useTranslations } from "next-intl";
import { Checkbox } from "~/components/ui/checkbox";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { toast } from "sonner";

export default function CreateClientForm({
  company_id,
}: {
  company_id: string;
}) {
  const t = useTranslations("Client");
  const m = useTranslations("Messages");

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      company_id,
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
      phone_number: "",
      mobile_number: "",
    },
  });

  const { mutate: submit } = api.client.addClient.useMutation();

  function onSubmit(values: z.infer<typeof createClientSchema>) {
    submit(
      {
        ...values,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success(m("client_created"));
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
          className=" flex h-full flex-col p-2"
        >
          <h1 className="text-2xl font-bold">{t("create_client")}</h1>
          <div className="  flex-1 space-y-2 p-2 ">
            <Card className="grid grid-cols-2 gap-2 p-2 shadow-md">
              <FormField
                control={form.control}
                name={"is_company"}
                render={({ field }) => (
                  <FormItem className="mt-8 flex w-full items-center  justify-start ">
                    <FormLabel
                      className={cn(
                        "relative w-full rounded-lg border  p-3",
                        field.value && "bg-secondary",
                      )}
                    >
                      {t("is_company")}
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
            </Card>
            <Card className="p-2 shadow-md">
              <CustomField
                label={t("btw_number")}
                name="btw_number"
                control={form.control}
                placeholder={t("btw_number")}
              />
            </Card>
            <Card className="grid grid-cols-2 gap-2 p-2 shadow-md">
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
            </Card>
            <Card className="grid grid-cols-2 gap-2 p-2 shadow-md">
              <div className="col-span-2">
                <CustomField
                  label={t("email")}
                  name="email"
                  control={form.control}
                  placeholder={t("email")}
                />
              </div>
              <CustomField
                label={t("phone")}
                name="phone_number"
                control={form.control}
                placeholder={t("phone")}
              />
              <CustomField
                label={t("mobile")}
                name="mobile_number"
                control={form.control}
                placeholder={t("mobile")}
              />
            </Card>
          </div>
          <Button type="submit" className="w-full">
            {t("create_client")}
          </Button>
        </form>
      </Form>
    </>
  );
}
