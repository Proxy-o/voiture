"use client";
import Link from "next/link";
import { type LucideIcon, UserRoundCog, UserRoundPlus } from "lucide-react";
import { Home, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "~/lib/utils";

import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSession } from "~/app/_context/SessionContext";

interface linksProps {
  title: string;
  link: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
}

export default function AdminNav() {
  const u = useTranslations("User");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const links: linksProps[] = [
    {
      title: u("create_company"),
      link: "/admin",
      icon: Home,
      variant: "ghost",
    },
    {
      title: u("create_user"),
      link: "/admin/user",
      icon: UserRoundPlus,
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
  const { user } = useSession();

  return (
    user && (
      <div className="group z-50 flex  h-full flex-col gap-4 border-r  py-2 shadow-lg">
        <nav className="flex h-full flex-col gap-1 px-2 ">
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
            href="#"
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
