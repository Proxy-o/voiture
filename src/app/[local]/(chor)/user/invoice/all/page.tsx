import { redirect } from "next/navigation";
import React from "react";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default async function page() {
  const { session, user } = await validateRequest();
  if (!session || !user) {
    redirect("/login");
  }
  const company = await api.user.getUserCompany.query(parseInt(user.id));
  if (!company) {
    redirect("/login");
  }
  const invoices = await api.invoice.getAllInvoices.query(
    Number(company.compagny.id),
  );
  console.log(invoices);
  return (
    <div>
      <Table className="border ">
        <TableCaption>A list of your recent Clients.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.client.surname}</TableCell>
              <TableCell>{invoice.client.email}</TableCell>
              <TableCell>{invoice.paid_status}</TableCell>
              <TableCell>
                <button>View</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
