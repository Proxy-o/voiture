"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "~/app/_context/SessionContext";
import { api } from "~/trpc/react";
import type { Car, Client } from "../../../types";
import { UserContext } from "../../_context/userContext";
import CarView from "../../components/carView";
import SelectCar from "../../components/selectCar";

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
      <div className="w-full  p-2">
        {isSuccess && company && (
          <SelectCar company_id={company.compagny.id.toString()} />
        )}
        <div className=" mt-4 h-full w-full overflow-auto">
          {isCarOpen && selectedCar && (
            <div className="flex w-full  items-center justify-center  ">
              <CarView selectedCar={selectedCar} />
            </div>
          )}
        </div>
      </div>
    </UserContext.Provider>
  );
}
