"use client";

import React from "react";
import { useForm } from "react-hook-form";
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
import { useSession } from "~/app/_context/SessionContext";
import { createClientSchema } from "~/server/api/types";
import CustomField from "../../admin/components/customFiled";

export default function CreateClientForm() {
  const { user } = useSession();
  console.log(user);
  const router = useRouter();

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
  if (!user) {
    router.push("/login");
  }
  const utils = api.useUtils();

  const { mutate: submit } = api.user.addClient
    .useMutation
    //   {
    //   onSuccess: async () => {
    //     utils.user.getClients.setData({ userId: user!.id }, (prev) => {
    //       if (!prev) {
    //         return [];
    //       }
    //       return [...prev, { id: Math.random(), name: form.getValues().name }];
    //     });
    //   },
    // }
    ();

  function onSubmit(values: z.infer<typeof createClientSchema>) {
    // submit({ ...values, company_id: user!.company_id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomField
          control={form.control}
          name="is_company"
          label="Is company"
          placeholder="Is company"
          description="Is company"
        />
        <Button type="submit">Add client</Button>
      </form>
    </Form>
  );
}
