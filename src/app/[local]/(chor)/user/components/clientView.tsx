import React from "react";
import { useTranslations } from "use-intl";
import { type z } from "zod";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type createClientSchema } from "~/server/api/types";

// add id to carSchema
export type Client = {
  id: bigint;
  is_company: boolean;
  surname: string | null;
  firstname: string | null;
  company_name: string | null;
  btw_number: string | null;
  street: string;
  postal_code: string;
  city: string;
  country: string;
  email: string | null;
  phone_number: string | null;
  mobile_number: string | null;
};
export default function ClientView({ client }: { client: Client | undefined }) {
  const t = useTranslations("Client");
  if (!client) {
    return <Card>{t("no_client")}</Card>;
  }
  return (
    <div>
      <p className="text-center font-bold">{t("client_info")}</p>
      <Card className="  grid  h-screen w-full gap-2 overflow-auto p-2 md:grid-cols-2">
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("surname")}</Label>
          <Input disabled value={client.surname ?? ""} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("first_name")}</Label>
          <Input disabled value={client.firstname ?? ""} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("company_name")}</Label>
          <Input disabled value={client.company_name ?? ""} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("btw_number")}</Label>
          <Input disabled value={client.btw_number ?? ""} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("street")}</Label>
          <Input disabled value={client.street} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("postal_code")}</Label>
          <Input disabled value={client.postal_code} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("city")}</Label>
          <Input disabled value={client.city} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("country")}</Label>
          <Input disabled value={client.country} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("email")}</Label>
          <Input disabled value={client.email ?? ""} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("phone")}</Label>
          <Input disabled value={client.phone_number ?? ""} />
        </div>
        <div className="space-y-2 border p-2 shadow-md">
          <Label className="font-light">{t("mobile")}</Label>
          <Input disabled value={client.mobile_number ?? ""} />
        </div>
      </Card>
    </div>
  );
}
