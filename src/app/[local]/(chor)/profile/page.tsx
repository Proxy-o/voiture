"use client";

import React, { useEffect, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Input } from "~/components/ui/input";
import { Button, buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { redirect, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSession } from "~/app/_context/SessionContext";
import { updateUserSchema } from "~/server/api/types";
import { Card } from "~/components/ui/card";
import Link from "next/link";
import { ArrowDown, Moon, Sun } from "lucide-react";
import { cn } from "~/lib/utils";

export default function Page() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { session, user } = useSession();
  if (!session || !user) {
    redirect("/login");
  }

  const { data: curentUser } = api.user.getOne.useQuery(parseInt(user.id));

  const t = useTranslations("User");

  const router = useRouter();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
  });

  const { mutate: submit } = api.user.update.useMutation({
    onSuccess: async () => {
      router.refresh();
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof updateUserSchema>) {
    submit({
      data: values,
      id: parseInt(user!.id),
    });
  }
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name of the User"
                      {...field}
                      defaultValue={curentUser?.username}
                      disabled={disabled}
                    />
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
                    <Input
                      type="password"
                      placeholder={t("password")}
                      {...field}
                      disabled={disabled}
                    />
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
                    <Input
                      placeholder={t("email")}
                      {...field}
                      defaultValue={curentUser?.email}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {disabled ? (
              <Button
                className="mt-2 w-full"
                onClick={() => setDisabled(false)}
              >
                {t("update_user")}
              </Button>
            ) : (
              <Button type="submit" className="mt-2 w-full">
                {t("save")}
              </Button>
            )}
          </form>
        </Form>
      </Card>
      <Card className="flex justify-around p-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {t("select_langue")}
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" flex flex-col  p-0">
            <Link
              href="/en/profile"
              className=" w-full p-2 text-center hover:bg-secondary"
            >
              English
            </Link>
            <DropdownMenuSeparator />
            <Link
              href="/fr/profile"
              className=" w-full p-2 text-center hover:bg-secondary"
            >
              French
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        {mounted && (
          <div className=" flex items-center justify-center border p-1">
            <p>{t("select_mode")} : </p>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                " justify-start text-primary ",
              )}
            >
              {theme === "dark" ? (
                <Sun className="mr-2 h-6 w-6 " />
              ) : (
                <Moon className="mr-2 h-6 w-6 " />
              )}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
