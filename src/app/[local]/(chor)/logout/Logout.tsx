import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { validateRequest } from "~/server/lucia/validateRequests";
import { lucia } from "~/server/lucia/auth";
import type { ActionResult } from "~/app/(auth)/signup/components/form";
import { Button } from "~/components/ui/button";
import { LogOut } from "lucide-react";

export default async function Logout() {
  return (
    <form action={logout}>
      <Button variant={"ghost"} type="submit">
        <LogOut className="ml-2 text-sm" />
      </Button>
    </form>
  );
}

export async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}