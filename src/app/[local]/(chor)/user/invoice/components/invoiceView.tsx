import { redirect } from "next/navigation";
import React from "react";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";
import { format } from "date-fns";
export default async function InvoiceView({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }
  //   verify if user is authorized to view invoice
  const company = await api.user.getUserCompany.query(Number(user.id));
  const invoice = await api.invoice.getInvoice.query(Number(invoiceId));

  if (!invoice || company?.compagny.id !== invoice?.company_id) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-center">
        No invoice found
      </div>
    );
  }

  return (
    <div>
      <h1>Invoice</h1>
      <div>
        <div>Client</div>
        <div>{format(invoice?.date, "yyyy-MM-dd")}</div>
      </div>
    </div>
  );
}
