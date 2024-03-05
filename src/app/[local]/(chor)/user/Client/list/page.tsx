"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "~/app/_context/SessionContext";
import { api } from "~/trpc/react";
import type { Car, Client } from "../../../types";
import { UserContext } from "../../_context/userContext";
import ClientView from "../../components/clientView";
import SelectClient from "../../components/selectClient";

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

  const [isClientOpen, setClientIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [isCarOpen, setIsCarOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car>();
  console.log(company);
  return (
    <UserContext.Provider
      value={{
        isClientOpen,
        setClientIsOpen,
        isCarOpen,
        setIsCarOpen,
        selectedCar,
        setSelectedCar,
        selectedClient,
        setSelectedClient,
      }}
    >
      <div className=" relative   ">
        {isSuccess && company && (
          <div className="  p-2 ">
            <SelectClient company_id={company.compagny.id.toString()} />
          </div>
        )}
        <div className=" h-full">
          {isClientOpen && selectedClient && (
            <div className=" ">
              <ClientView client={selectedClient} />
            </div>
          )}
        </div>
      </div>
    </UserContext.Provider>
  );
}
