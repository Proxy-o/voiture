import Link from "next/link";
import React from "react";

import { Skeleton } from "~/components/ui/skeleton";
import { validateRequest } from "~/server/lucia/validateRequests";
import Logout from "~/app/[local]/(chor)/logout/Logout";

export default async function Header() {
  const { user } = await validateRequest();

  return (
    <header className=" sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 px-10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-14  items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              1337 Typing
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm"></nav>
        </div>

        <div className="flex flex-1 items-center justify-end  space-x-2">
          {user ? (
            <nav className="flex cursor-pointer items-center">
              <Link href="/profile">
                <span className="mr-2 text-primary">{user.username}</span>
              </Link>
              <Logout />
            </nav>
          ) : (
            <Skeleton>login</Skeleton>
          )}
        </div>
      </div>
    </header>
  );
}
