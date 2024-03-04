import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";
import Invoices from "src/app/[local]/(chor)/user/invoice/all/page";
import Link from "next/link";

export default async function Page() {
  const { session, user } = await validateRequest();
  if (!session || !user) {
    redirect("/login");
  }
  const company = await api.user.getUserCompany.query(parseInt(user.id));
  if (!company) {
    redirect("/login");
  }
  const cars = await api.car.getCompanyCars.query(
    parseInt(company.compagny.id.toString()),
  );
  const client = await api.client.getCompanyClients.query(
    parseInt(company.compagny.id.toString()),
  );

  //   show number of cars and clients in Card and a button to add new car or client
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <Card className="flex size-96 flex-col items-center justify-center bg-primary p-4 ">
          <p>Number of Cars </p>
          <div className="flex flex-1 items-center text-6xl font-bold">
            {cars.length}
          </div>
          <Link
            href="/user/car "
            className="flex w-full justify-center bg-secondary  p-2 hover:bg-secondary/50"
          >
            Add new car
            <PlusIcon className="ml-2" />
          </Link>
        </Card>
        <Card className="flex size-96 flex-col items-center justify-center bg-primary p-4 ">
          <p>Number of client </p>
          <div className="flex flex-1 items-center text-6xl font-bold">
            {client.length}
          </div>
          <Link
            href="/user/client "
            className="flex w-full justify-center bg-secondary  p-2 hover:bg-secondary/50"
          >
            Add new Client
            <PlusIcon className="ml-2" />
          </Link>
        </Card>
      </div>
      <Invoices />
      <Link
        href="/user/invoice "
        className="flex w-full justify-center bg-secondary  p-2 hover:bg-secondary/50"
      >
        Add new Invoice
        <PlusIcon className="ml-2" />
      </Link>{" "}
    </div>
  );
}
