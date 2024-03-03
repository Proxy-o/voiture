"use client";
import React from "react";
import type { Car, Client, Company, Invoice } from "../../../types";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { Card } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { usePDF } from "react-to-pdf";
import { Button } from "~/components/ui/button";

export default function InvoicePdf({
  company,
  client,
  car,
  invoice,
}: {
  company: Company;
  client: Client;
  car: Car;
  invoice: Invoice;
}) {
  const t = useTranslations("Invoice");
  const c = useTranslations("Car");
  const { toPDF, targetRef } = usePDF({
    filename: company.company_name + "_" + client.firstname,
  });

  return (
    <>
      <Card className=" min-w-[40rem]  p-2" ref={targetRef}>
        <h1 className="text-xl font-extrabold">Invoice #</h1>
        <div className="grid grid-cols-2 border-b pb-4">
          <div className=" flex items-center">
            <p className="m-2 font-bold">{t("company_name")} : </p>
            {company.company_name}
          </div>
          <div className="flex w-full flex-col items-end justify-end p-2 font-light">
            <p className="font-thin">
              {company.street}, {company.city}, {company.country},{" "}
              {company.zip_code}
            </p>
            <p className="font-thin">VAT {company.vat_number}</p>
            <p className="font-thin">
              {company.owner_email}, Tele: {company.owner_phone}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 border-b pt-4">
          <div className="col-span-2 flex w-full  flex-col p-2 font-light">
            <div className="font-extrabold">{t("bill_to")} :</div>
            <div className="p-2">
              <p className="font-bold">
                {client.firstname} {client.surname}
              </p>
              <p className="font-thin">{client.street}</p>
              <p className="font-thin">
                {client.city}, {client.country}, {client.postal_code}
              </p>
              <p className="font-thin">{client.email}</p>
              <p className="font-thin">{client.mobile_number}</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div>
              <h1 className="font-bold">{t("invoice")}</h1>
              <h1>{t("invoice_date")}</h1>
              <h1>{t("invoice_due_date")}</h1>
            </div>
            <div>
              <p className="font-thin">{invoice.id.toString()}</p>
              <p className="font-thin">
                {format(invoice.date.toString(), "MM-dd-yyy")}
              </p>
              <p className="font-thin">
                {format(invoice.due_date.toString(), "MM-dd-yyy")}
              </p>
            </div>
          </div>
        </div>
        <Table className="mt-4">
          <TableBody>
            <TableRow>
              <TableCell>{c("car")}</TableCell>
              <TableCell>{c("color")}</TableCell>
              <TableCell>{c("chassis_number")}</TableCell>
              <TableCell>{c("brand")}</TableCell>
              <TableCell>{c("model")}</TableCell>
              <TableCell>{c("mileage")}</TableCell>
              <TableCell>{c("first_registration")}</TableCell>
              <TableCell>{c("engine_power")}</TableCell>
              <TableCell>{c("cylinder")}</TableCell>
              <TableCell>{c("fuel")}</TableCell>
              <TableCell>{c("co2")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{car.car_type}</TableCell>
              <TableCell>{car.color}</TableCell>
              <TableCell>{car.chassis_number}</TableCell>
              <TableCell>{car.brand}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.mileage}</TableCell>
              <TableCell>
                {format(car.first_registration, "MM-dd-yyyy")}
              </TableCell>
              <TableCell>{car.engine_power}</TableCell>
              <TableCell>{car.cylinder}</TableCell>
              <TableCell>{car.fuel}</TableCell>
              <TableCell>{car.co2}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="m-2 border-t">
          <div className="flex justify-end p-2">
            <p className="mr-2 font-bold">{t("advance")} :</p>
            <p className="font-thin">{invoice.advance}</p>
          </div>
          <div className="flex justify-end p-2">
            <p className="mr-2 font-bold">{t("amount")} :</p>
            <p className="font-thin">{invoice.amount}</p>
          </div>
          <div className="flex justify-end p-2">
            <p className="mr-2 font-bold">{t("payment_method")} :</p>
            <p className="font-thin">{invoice.payment_method}</p>
          </div>
          <div className="flex justify-end p-2">
            <p className="mr-2 font-bold">{t("paid_status")} :</p>
            <p className="font-thin">
              {invoice.paid_status == false ? t("pending") : t("paid")}
            </p>
          </div>
        </div>
      </Card>
      <Button onClick={() => toPDF()}>Download</Button>
    </>
  );
}
