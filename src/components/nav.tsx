"use client";
import Link from "next/link";
import { LogOut, LucideIcon, UserRoundCog } from "lucide-react";
import {
  Archive,
  User,
  Home,
  GamepadIcon,
  Send,
  Users,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "~/lib/utils";

import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface linksProps {
  title: string;
  link: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
}

export default function Nav() {
  //   const { mutate: logout } = useLogout();
  const u = useTranslations("User");

  const links: linksProps[] = [
    {
      title: "login",
      link: "/login",
      icon: Home,
      variant: "ghost",
    },
    {
      title: u("add_client"),
      link: "/user/client",
      icon: GamepadIcon,
      variant: "ghost",
    },
    {
      title: u("add_car"),
      link: "/user/car",
      icon: GamepadIcon,
      variant: "ghost",
    },
    {
      title: u("add_invoice"),
      link: "/user/invoice",
      icon: Send,
      variant: "ghost",
    },
    {
      title: "Profile",
      link: "/profile",
      icon: User,
      variant: "ghost",
    },
    {
      title: "Archive",
      link: "/archive",
      icon: Archive,
      variant: "ghost",
    },
    {
      title: "Friends",
      link: "/friends",
      icon: Users,
      variant: "ghost",
    },
  ];
  const { theme, setTheme } = useTheme();
  let path = usePathname();
  //   remove the local "en or fr" from the path
  path = path.replace(/\/(en|fr)/, "");

  const activeLink = links.findIndex((link) => link.link === path);
  // set the variant of the active link to default
  links[activeLink] = {
    ...links[activeLink],
    variant: "default",
  };
  const handleLogout = () => {
    // logout();
  };

  return (
    <div className="group flex h-screen flex-col gap-4 border py-2 shadow-lg md:w-[8.5rem]">
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
        <Button
          variant={"ghost"}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-2 justify-start",
          )}
          onClick={() => handleLogout()}
        >
          <LogOut className="mr-2 h-6 w-6 " />
          logout
        </Button>
        {/* add shose them them */}
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
      </div>
    </div>
  );
}
