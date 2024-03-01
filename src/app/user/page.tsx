import React from "react";
import { validateRequest } from "~/server/lucia/validateRequests";
import CreateClientForm from "./components/createClientForm";
import ClientsList from "./components/clientsList";

export default async function Page() {
  const { session, user } = await validateRequest();

  console.log(user);
  return (
    <div>
      <CreateClientForm />
      <ClientsList />
    </div>
  );
}
