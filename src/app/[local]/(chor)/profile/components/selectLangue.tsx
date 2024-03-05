"use client";
import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
export default function SelectLangue() {
  // get the current path
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="bg-secondary hover:bg-primary/30">
          <Languages className="" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" flex flex-col  p-0">
        <Link
          // replace fr with en
          href={pathname.replace("/fr/", "/en/")}
          className=" w-full p-2 text-center hover:bg-secondary"
        >
          En
        </Link>
        <Link
          href={pathname.replace("/en/", "/fr/")}
          className=" w-full p-2 text-center hover:bg-secondary"
        >
          Fr
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
