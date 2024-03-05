"use client";
import Link from "next/link";
import {
  type LucideIcon,
  UserRoundCog,
  UserRoundPlus,
  Car,
  FileText,
  CarFront,
} from "lucide-react";
import { Archive, Home, Users, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "~/lib/utils";

import { buttonVariants } from "./ui/button";
import { redirect, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSession } from "~/app/_context/SessionContext";
import { api } from "~/trpc/react";
import AdminNav from "./adminNav";

interface linksProps {
  title: string;
  link: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
}

export default function Nav() {
  const u = useTranslations("User");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const links: linksProps[] = [
    {
      title: u("dashboard"),
      link: "/",
      icon: Home,
      variant: "ghost",
    },

    {
      title: u("add_client"),
      link: "/user/client",
      icon: UserRoundPlus,
      variant: "ghost",
    },
    {
      title: u("add_car"),
      link: "/user/car",
      icon: Car,
      variant: "ghost",
    },
    {
      title: u("add_invoice"),
      link: "/user/invoice",
      icon: FileText,
      variant: "ghost",
    },

    {
      title: u("invoice_list"),
      link: "/user/invoice/all",
      icon: Archive,
      variant: "ghost",
    },
    {
      title: u("client_list"),
      link: "/user/client/list",
      icon: Users,
      variant: "ghost",
    },
    {
      title: u("car_list"),
      link: "/user/car/list",
      icon: CarFront,
      variant: "ghost",
    },
  ];
  useEffect(() => {
    setMounted(true);
  }, []);

  let path = usePathname();
  path = path.replace(/\/(en|fr)/, "");
  links.map((link) => {
    if (path === link.link) {
      link.variant = "default";
    }
  });
  const { session, user } = useSession();
  if (!session || !user) {
    return redirect("/login");
  }

  const { data: currentUser, isLoading } = api.user.getOne.useQuery(
    parseInt(user.id),
  );
  if (!isLoading && currentUser && currentUser.is_admin) {
    return <AdminNav />;
  }

  return (
    user &&
    !isLoading && (
      <div className="group z-50 flex  h-full flex-col gap-4 border-r  py-2 shadow-lg">
        <nav className="flex h-full flex-col gap-1  ">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),

                "mb-2 justify-start ",
              )}
            >
              <link.icon className="mr-2 h-6 w-6 " />
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col px-2">
          <Link
            href="/profile"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "mb-2 justify-start",
            )}
          >
            <UserRoundCog className="mr-2 h-6 w-6 " />
            Sittings
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "mb-2 justify-start text-primary",
              )}
            >
              {theme === "dark" ? (
                <Sun className="mr-2 h-6 w-6 " />
              ) : (
                <Moon className="mr-2 h-6 w-6 " />
              )}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          )}
        </div>
      </div>
    )
  );
}
