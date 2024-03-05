import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { Card } from "~/components/ui/card";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";
import Invoices from "src/app/[local]/(chor)/user/invoice/all/page";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const { session, user } = await validateRequest();
  const t = await getTranslations("User");
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
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <div className="flex min-h-64 w-full gap-2">
        <Card className="flex size-full flex-col items-center justify-center bg-primary/60 p-4 ">
          <p>{t("car_num")}</p>
          <div className="flex flex-1 items-center text-6xl font-bold">
            {cars.length}
          </div>
          <Link
            href="/user/car "
            className="flex w-full justify-center bg-secondary  p-2 hover:bg-secondary/50"
          >
            {t("add_car")}
            <PlusIcon className="ml-2" />
          </Link>
        </Card>
        <Card className="flex size-full  flex-col items-center justify-center bg-primary/60 p-4">
          <p>{t("client_num")} </p>
          <div className="flex flex-1 items-center text-6xl font-bold">
            {client.length}
          </div>
          <Link
            href="/user/client "
            className="flex w-full justify-center bg-secondary  p-2 hover:bg-secondary/50"
          >
            {t("add_client")}
            <PlusIcon className="ml-2" />
          </Link>
        </Card>
      </div>
      <div className="h-full">
        <Invoices />
      </div>
      <Link
        href="/user/invoice "
        className="flex w-full justify-center bg-primary/80  p-2  hover:bg-primary/50"
      >
        {t("add_invoice")}
        <PlusIcon className="ml-2" />
      </Link>
    </div>
  );
}
