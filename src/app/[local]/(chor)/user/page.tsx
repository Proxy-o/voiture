import React from "react";
import { validateRequest } from "~/server/lucia/validateRequests";
import CreateClientForm from "./components/createClientForm";
import ClientsList from "./components/clientsList";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session, user } = await validateRequest();
  if (!session || !user) {
    redirect("/login");
  }

  const company = await api.user.getUserCompany.query(parseInt(user.id));
  if (!company) {
    redirect("/login");
  }

  // get user data
  return (
    <div>
      <CreateClientForm company_id={company.compagny.id.toString()} />
      <ClientsList company_id={company.compagny.id.toString()} />
    </div>
  );
}
