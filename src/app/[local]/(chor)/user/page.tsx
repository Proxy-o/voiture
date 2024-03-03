"use client";
import React, { use, useState } from "react";
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
import SelectClient from "./components/selectClient";
import { UserContext } from "./context/userContext";

export default function Page() {
  const [carId, setCarId] = useState("");
  const [clientId, setClientId] = useState("");
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
  const [isCarOpen, setIsCarOpen] = useState(false);
  const [isClientOpen, setClientIsOpen] = useState(false);
  return (
    <UserContext.Provider
      value={{ isCarOpen, setIsCarOpen, isClientOpen, setClientIsOpen }}
    >
      <div>
        {/* <CreateClientForm company_id={company.compagny.id.toString()} />
      <ClientsList company_id={company.compagny.id.toString()} /> */}
        {/* <CreateCarForm company_id={company.compagny.id.toString()} /> */}
        {/* <CreateInvoiceForm company_id={company.compagny.id.toString()} /> */}
        {company && (
          <SelectCar
            company_id={company.compagny.id.toString()}
            setCarId={setCarId}
          />
        )}
        {company && (
          <SelectClient
            company_id={company.compagny.id.toString()}
            setClientId={setClientId}
          />
        )}
      </div>
    </UserContext.Provider>
  );
}
