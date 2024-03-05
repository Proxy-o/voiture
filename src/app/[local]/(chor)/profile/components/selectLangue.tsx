"use client";
import { ArrowDown, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
export default function SelectLangue() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="bg-secondary hover:bg-primary/30">
          <Languages className="" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" flex flex-col  p-0">
        <Link
          href="/en/profile"
          className=" w-full p-2 text-center hover:bg-secondary"
        >
          En
        </Link>
        <Link
          href="/fr/profile"
          className=" w-full p-2 text-center hover:bg-secondary"
        >
          Fr
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
