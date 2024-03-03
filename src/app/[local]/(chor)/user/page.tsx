"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import CreateInvoiceForm from "./components/createInvoiceForm";
import SelectCar from "./components/selectCar";
import { useSession } from "~/app/_context/SessionContext";
import { api } from "~/trpc/react";
import SelectClient from "./components/selectClient";
import { UserContext } from "./_context/userContext";
import CarView, { type Car } from "./components/carView";
import ClientView, { type Client } from "./components/clientView";
import { ArrowRight } from "lucide-react";

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
        {company && (
          <div className="flex-1 space-y-2">
            <>
              <SelectCar company_id={company.compagny.id.toString()} />
              <SelectClient company_id={company.compagny.id.toString()} />
            </>
            <CreateInvoiceForm
              company_id={company.compagny.id.toString()}
              car_id={selectedCar?.id.toString()}
              client_id={selectedCar?.id.toString()}
            />
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
