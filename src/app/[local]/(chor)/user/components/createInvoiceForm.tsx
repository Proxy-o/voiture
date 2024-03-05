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
import { createInvoiceSchema } from "~/server/api/types";
import { toast } from "sonner";

export default function CreateInvoiceForm({
  company_id,
  car_id,
  client_id,
}: {
  company_id: string;
  car_id: string | undefined;
  client_id: string | undefined;
}) {
  const t = useTranslations("Invoice");
  const m = useTranslations("Messages");

  const form = useForm<z.infer<typeof createInvoiceSchema>>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      company_id,
      client_id,
      car_id,
      date: new Date(),
      due_date: new Date(),
      advance: 0,
      amount: 0,
      payment_method: "",
      paid_status: false,
      memo: "",
    },
  });
  const { mutate: submit } = api.invoice.addInvoice.useMutation();
  function onSubmit(values: z.infer<typeof createInvoiceSchema>) {
    submit(
      {
        ...values,
        company_id,
        car_id,
        client_id,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success(m("invoice_created"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex  h-full flex-1 flex-col rounded-sm border p-2"
      >
        <div className=" flex-1 ">
          <FormField
            control={form.control}
            name={"date"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-1/2">{t("date")}</FormLabel>
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
            name={"due_date"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-1/2">{t("due_date")}</FormLabel>
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
          <CustomField
            label={t("advance")}
            name="advance"
            control={form.control}
            placeholder={t("advance")}
          />
          <CustomField
            label={t("amount")}
            name="amount"
            control={form.control}
            placeholder={t("amount")}
          />
          <CustomField
            label={t("payment_method")}
            name="payment_method"
            control={form.control}
            placeholder={t("payment_method")}
          />
          <CustomField
            label={t("paid_status")}
            name="paid_status"
            control={form.control}
            placeholder={t("paid_status")}
          />
          <CustomField
            label={t("memo")}
            name="memo"
            control={form.control}
            placeholder={t("memo")}
          />
        </div>
        <Button type="submit" disabled={!client_id || !car_id}>
          {t("create_invoice")}{" "}
        </Button>
      </form>
    </Form>
  );
}
