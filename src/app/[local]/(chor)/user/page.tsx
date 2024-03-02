"use client";
import React, { use } from "react";
import { validateRequest } from "~/server/lucia/validateRequests";
import CreateClientForm from "./components/createClientForm";
import ClientsList from "./components/clientsList";
import { redirect } from "next/navigation";
import CreateCarForm from "./components/createCarForm";
import CreateInvoiceForm from "./components/createInvoiceForm";
import { Select } from "@radix-ui/react-select";
import SelectCar from "./components/selectCar";
import { useSession } from "~/app/_context/SessionContext";
import { api } from "~/trpc/react";

export default function Page() {
  const { session, user } = useSession();
  if (!session || !user) {
    redirect("/login");
  }

  const { data: company, isSuccess } = api.user.getUserCompany.useQuery(
    parseInt(user.id),
  );
  if (!company && isSuccess) {
    redirect("/login");
  }

  // get user data
  return (
    <div>
      {/* <CreateClientForm company_id={company.compagny.id.toString()} />
      <ClientsList company_id={company.compagny.id.toString()} /> */}
      {/* <CreateCarForm company_id={company.compagny.id.toString()} /> */}
      {/* <CreateInvoiceForm company_id={company.compagny.id.toString()} /> */}
      {company && <SelectCar company_id={company.compagny.id.toString()} />}
    </div>
  );
}
