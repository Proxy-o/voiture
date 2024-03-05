import Link from "next/link";
import React from "react";

import { Skeleton } from "~/components/ui/skeleton";
import { validateRequest } from "~/server/lucia/validateRequests";
import Logout from "~/app/[local]/(chor)/logout/Logout";
import { api } from "~/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SelectLangue from "~/app/[local]/(chor)/profile/components/selectLangue";

export default async function Header() {
  const { user } = await validateRequest();
  let curentUser;
  if (!user) {
    curentUser = { compagny: { company_logo: "", company_name: "" } };
  } else {
    curentUser = await api.user.getOne.query(parseInt(user.id));
  }

  return (
    user && (
      <header className=" sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 px-10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-14  items-center">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Avatar>
                <AvatarImage
                  src={curentUser?.compagny.company_logo ?? "/logo.png"}
                  alt="@logo"
                />
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>

              <span className="hidden font-bold sm:inline-block">
                {curentUser?.compagny.company_name}
              </span>
            </Link>

            <nav className="flex items-center gap-6 text-sm"></nav>
          </div>

          <div className="flex flex-1 items-center justify-end  space-x-2">
            {user ? (
              <nav className="flex cursor-pointer items-center">
                <Link href="/profile">
                  <span className="mr-2 ">{user.username}</span>
                </Link>
                <SelectLangue />
                <Logout />
              </nav>
            ) : (
              <Skeleton>login</Skeleton>
            )}
          </div>
        </div>
      </header>
    )
  );
}
