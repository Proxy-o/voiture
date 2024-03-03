"use client";
import React, { useContext, useState } from "react";
import CarView from "./carView";
import { api } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import ClientView from "./clientView";
import { UserContext } from "../context/userContext";

export default function SelectClient({
  company_id,
  setClientId,
}: {
  company_id: string;
  setClientId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations("Client");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const { data: clients } = api.client.getCompanyClients.useQuery(
    parseInt(company_id),
  );
  const { isClientOpen, setClientIsOpen, setIsCarOpen } =
    useContext(UserContext);

  const handelClientChange = (id: string) => {
    setClientId(id);
    setSelectedClient(id);
    setIsCarOpen(false);
  };
  const handelOpenChange = () => {
    setClientIsOpen(true);
    setIsCarOpen(false);
  };

  return (
    <div className="flex border">
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
      {clients &&
        clients.length > 0 &&
        isClientOpen &&
        parseInt(selectedClient) > 0 && (
          <div className="flex items-center transition delay-150 ease-in-out">
            <ArrowRight onClick={() => setClientIsOpen(false)} />
            <ClientView
              client={
                clients.find((car) => car.id.toString() === selectedClient) ??
                clients[0]
              }
            />
          </div>
        )}
    </div>
  );
}
