"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { createUserSchema } from "../types";
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
import SelectChoice from "./selectChoice";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function CreateUserForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      role: "user",
      type: "gym",
    },
  });

  const { mutate: submit } = api.user.create.useMutation({
    onSuccess: async () => {
      router.refresh();
      form.reset();
    },
  });
  function onSubmit(values: z.infer<typeof createUserSchema>) {
    submit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="Password of the User" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email of the User" {...field} />
              </FormControl>
              <FormDescription>This is your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <SelectChoice
                  value={field.value ?? "user"}
                  onChange={field.onChange}
                  choices={["user", "admin"]}
                />
              </FormControl>
              <FormDescription>This is your role.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of the company</FormLabel>
              <FormControl>
                <SelectChoice
                  value={field.value ?? "gym"}
                  onChange={field.onChange}
                  choices={["gym", "cafe", "restaurant"]}
                />
              </FormControl>
              <FormDescription>This the type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create User</Button>
      </form>
    </Form>
  );
}
