import { redirect } from "next/navigation";
import React from "react";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";
import InvoicePdf from "./invoicePdf";
export default async function InvoiceView({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }
  const compgany = await api.user.getUserCompany.query(Number(user.id));
  const fullInvoice = await api.invoice.getInvoice.query(Number(invoiceId));

  if (!fullInvoice || compgany?.compagny.id !== fullInvoice?.company_id) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-center">
        No invoice found
      </div>
    );
  }
  const client = fullInvoice.client;
  const car = fullInvoice.car;
  const company = compgany.compagny;

  console.log("oh yeah", fullInvoice);
  //   send only the invoice atributs
  const invoice = {
    client_id: fullInvoice.client_id,
    car_id: fullInvoice.car_id,
    company_id: fullInvoice.company_id,
    id: fullInvoice.id,
    date: fullInvoice.date,
    due_date: fullInvoice.due_date,
    advance: Number(fullInvoice.advance),
    amount: Number(fullInvoice.amount),
    payment_method: fullInvoice.payment_method,
    paid_status: fullInvoice.paid_status,
    memo: fullInvoice.memo,
  };
  return (
    <div className="flex flex-col ">
      <InvoicePdf
        company={company}
        client={client}
        car={car}
        invoice={invoice}
      />
      {/* <Button>download</Button> */}
    </div>
  );
}
