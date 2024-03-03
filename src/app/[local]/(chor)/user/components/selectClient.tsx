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
import { type Client } from "./clientView";
import { UserContext } from "../_context/userContext";

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
        ) : (
          <p>{t("no_client_yet")}</p>
        )}
      </div>
    </div>
  );
}
