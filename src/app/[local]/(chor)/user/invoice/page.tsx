"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import CreateInvoiceForm from "../components/createInvoiceForm";
import SelectCar from "../components/selectCar";
import { useSession } from "~/app/_context/SessionContext";
import { api } from "~/trpc/react";
import SelectClient from "../components/selectClient";
import { UserContext } from "../_context/userContext";
import CarView from "../components/carView";
import ClientView from "../components/clientView";
import { ArrowRight } from "lucide-react";
import type { Car, Client } from "../../types";

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

  const handleFormClick = () => {
    setIsCarOpen(false);
    setClientIsOpen(false);
  };
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
      <div className="flex  h-full  " onClick={handleFormClick}>
        {company && (
          <div className="flex flex-1 flex-col space-y-2 p-2">
            <SelectCar company_id={company.compagny.id.toString()} />
            <SelectClient company_id={company.compagny.id.toString()} />
            <div className="flex-1 ">
              <CreateInvoiceForm
                company_id={company.compagny.id.toString()}
                car_id={selectedCar?.id.toString()}
                client_id={selectedClient?.id.toString()}
              />
            </div>
          </div>
        )}
        <div>
          {isCarOpen && selectedCar && (
            <div className="flex items-center ">
              <ArrowRight
                onClick={() => setIsCarOpen(false)}
                className="cursor-pointer"
              />
              <CarView selectedCar={selectedCar} />
            </div>
          )}
          {isClientOpen && selectedClient && (
            <div className="flex items-center ">
              <ArrowRight
                onClick={() => setClientIsOpen(false)}
                className="cursor-pointer"
              />
              <ClientView client={selectedClient} />
            </div>
          )}
        </div>
      </div>
    </UserContext.Provider>
  );
}
