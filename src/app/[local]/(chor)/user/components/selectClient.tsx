"use client";
import React, { useContext } from "react";
import { api } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useTranslations } from "next-intl";
import { UserContext } from "../_context/userContext";
import Link from "next/link";
import type { Client } from "../../types";
import { PlusIcon } from "lucide-react";

export default function SelectClient({ company_id }: { company_id: string }) {
  const t = useTranslations("Client");
  const { data: clients } = api.client.getCompanyClients.useQuery(
    parseInt(company_id),
  );
  const { setClientIsOpen, setIsCarOpen, setSelectedClient } =
    useContext(UserContext)!;

  const handelClientChange = (id: string) => {
    const client = clients?.find(
      (client: Client) => client.id.toString() === id,
    );
    setSelectedClient(client);
    setIsCarOpen(false);
  };
  const handelOpenChange = () => {
    setClientIsOpen(true);
    setIsCarOpen(false);
  };

  return (
    <div className="flex ">
      <div className="flex-1">
        {clients && clients.length > 0 ? (
          <div className="flex items-center justify-center">
            <Select
              onValueChange={handelClientChange}
              onOpenChange={handelOpenChange}
            >
              <SelectTrigger className="w-full">
                <div>
                  <SelectValue placeholder={t("select_client")} />
                </div>
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem value={client.id.toString()} key={client.id}>
                    {client.surname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link href="/user/client " className="p-2 hover:bg-secondary ">
              <PlusIcon />
            </Link>
          </div>
        ) : (
          <p>{t("no_client_yet")}</p>
        )}
      </div>
    </div>
  );
}
