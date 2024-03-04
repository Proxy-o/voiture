"use client";
import type { Invoice } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function InvoiceTable({ invoices }: { invoices: Invoic[] }) {
  return (
    <div>
      <Table className="border ">
        <TableCaption>{i("list_of_invoices")}</TableCaption>
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
              <TableCell>{invoice.paid_status ? "pending" : "done"}</TableCell>
              <TableCell>
                <Link href={`/user/invoice/${invoice.id}`}>View</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
