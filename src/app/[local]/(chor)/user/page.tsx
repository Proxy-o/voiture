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
import CarView, { Car } from "./components/carView";
import ClientView, { Client } from "./components/clientView";
import { ArrowRight } from "lucide-react";

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
  const [selectedCar, setSelectedCar] = useState<Car>();

  const [isClientOpen, setClientIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client>();

  return (
    <UserContext.Provider
      value={{
        isCarOpen,
        setIsCarOpen,
        isClientOpen,
        setClientIsOpen,
        selectedCar,
        setSelectedCar,
        selectedClient,
        setSelectedClient,
      }}
    >
      <div className="flex">
        {/* <CreateClientForm company_id={company.compagny.id.toString()} />
      <ClientsList company_id={company.compagny.id.toString()} /> */}
        {/* <CreateCarForm company_id={company.compagny.id.toString()} /> */}
        {company && (
          <div className="flex-1 space-y-2">
            <>
              <SelectCar
                company_id={company.compagny.id.toString()}
                setCarId={setCarId}
              />
              <SelectClient
                company_id={company.compagny.id.toString()}
                setClientId={setClientId}
              />
            </>
            <CreateInvoiceForm company_id={company.compagny.id.toString()} />
          </div>
        )}
        <div>
          {isCarOpen && selectedCar && (
            <div className="flex items-center ">
              <ArrowRight onClick={() => setIsCarOpen(false)} />
              <CarView selectedCar={selectedCar} />
            </div>
          )}
          {isClientOpen && selectedClient && (
            <div className="flex items-center ">
              <ArrowRight onClick={() => setClientIsOpen(false)} />
              <ClientView client={selectedClient} />
            </div>
          )}
        </div>
      </div>
    </UserContext.Provider>
  );
}
