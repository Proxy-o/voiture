import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "~/server/lucia/auth";
import { db } from "~/server/db";
import { Card } from "~/components/ui/card";
import { Asterisk, User } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { type ActionResult, Form } from "./components/Form";

export default async function Page() {
  return (
    <div className="m-32 space-y-2">
      <h1>Login</h1>
      <Form action={login}>
        <Card className="flex flex-col p-2 ">
          <div className="relative">
            <Label htmlFor="name">name</Label>
            <Input name="name" id="name" placeholder="username" />
            <div className="absolute right-3 top-2/3 -translate-y-1/2 transform">
              <User className="h-5 w-5 text-secondary" />
            </div>
          </div>
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <div className="absolute right-3 top-2/3 -translate-y-1/2 transform">
              <Asterisk className="h-5 w-5 text-secondary" />
            </div>
          </div>

          <br />
          <Button>Login</Button>
        </Card>
      </Form>
    </div>
  );
}

async function login(_: unknown, formData: FormData): Promise<ActionResult> {
  "use server";
  const name = formData.get("name");
  if (
    typeof name !== "string" ||
    name.length < 3 ||
    name.length > 31 ||
    !/^[a-z0-9_-]+$/.test(name)
  ) {
    return {
      error: "Invalid name",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = await db.user.findUnique({
    where: {
      username: name.toLocaleLowerCase(),
    },
  });
  if (!existingUser) {
    return {
      error: "Incorrect name or password",
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password,
  );
  if (!validPassword) {
    return {
      error: "Incorrect name or password",
    };
  }

  const session = await lucia.createSession(existingUser.id.toString(), {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
