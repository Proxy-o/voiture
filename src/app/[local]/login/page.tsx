import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "~/server/lucia/auth";
import { db } from "~/server/db";
import type { ActionResult } from "../../(auth)/signup/page";
import { Form } from "../../(auth)/signup/components/form";

export default async function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <Form action={login}>
        <label htmlFor="name">name</label>
        <input name="name" id="name" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </Form>
    </>
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
      name: name.toLocaleLowerCase(),
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
