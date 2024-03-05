"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { createUserSchema } from "../../../../../server/api/types";
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
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import SelectCompany from "./selectCompany";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import { toast } from "sonner";

export default function CreateUserForm() {
  const t = useTranslations("User");
  const m = useTranslations("Messages");
  const [companyId, setCompanyId] = React.useState<string>("0");

  const router = useRouter();
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      compagnyId: parseInt(companyId),
      is_admin: false,
    },
  });

  const { mutate: submit } = api.user.create.useMutation({
    onSuccess: async () => {
      router.refresh();
      form.reset();
      toast.success(m("user_created"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function onSubmit(values: z.infer<typeof createUserSchema>) {
    submit(
      {
        ...values,
        compagnyId: parseInt(companyId),
      },
      {
        onSuccess: () => {
          router.refresh();
        },
      },
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SelectCompany setCompanyId={setCompanyId} />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input placeholder="Name of the User" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="compagnyId"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input placeholder="Name of the User" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t("password")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input placeholder={t("email")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_admin"
          render={({ field }) => (
            <FormItem className="my-8  flex items-center justify-center">
              <FormLabel
                className={cn(
                  "relative w-full rounded-md border p-3",
                  field.value && "bg-secondary",
                )}
              >
                {t("is_admin")}
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

        <Button type="submit" className="w-full" disabled={companyId === "0"}>
          {t("create_user")}
        </Button>
      </form>
    </Form>
  );
}
