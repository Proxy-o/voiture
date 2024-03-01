"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";
import CreateClientForm from "./components/createClientForm";
import { useSession } from "../_context/SessionContext";
import ClientsList from "./components/clientsList";

export default function Page() {
  const { session, user } = useSession();

  console.log(user);
  return (
    <div>
      <CreateClientForm />
      <ClientsList />
    </div>
  );
}
