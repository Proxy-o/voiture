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
import { createClientSchema } from "../types";
import { useSession } from "~/app/_context/SessionContext";

export default function CreateClientForm() {
  const { user } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: "",
    },
  });
  if (!user) {
    router.push("/login");
  }
  const utils = api.useUtils();

  const { mutate: submit } = api.user.addClient.useMutation({
    onSuccess: async () => {
      utils.user.getClients.setData({ userId: user!.id }, (prev) => {
        if (!prev) {
          return [];
        }
        return [...prev, { id: Math.random(), name: form.getValues().name }];
      });
    },
  });

  function onSubmit(values: z.infer<typeof createClientSchema>) {
    submit({ ...values, userId: user!.id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of the User" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add client</Button>
      </form>
    </Form>
  );
}
