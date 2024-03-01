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

export default function ClientsList() {
  const { user } = useSession();
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  const { data: clients } = api.user.getClients.useQuery({ userId: user!.id });
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
          clients.map((client: { id: number; name: string }) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.name}</TableCell>
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
