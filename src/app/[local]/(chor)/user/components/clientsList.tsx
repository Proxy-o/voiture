"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "~/app/_context/SessionContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";

export default function ClientsList({ company_id }: { company_id: string }) {
  const { user } = useSession();
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  const { data: clients } = api.company.getClients.useQuery(
    parseInt(company_id),
  );
  return (
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
        {clients ? (
          clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                {client.firstname} {client.surname}
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <button>Edit</button>
                <button>Delete</button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No Clients yet</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
