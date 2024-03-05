"use client";
import React from "react";
import { api } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function SelectCompany({
  setCompanyId,
}: {
  setCompanyId: (id: string) => void;
}) {
  const t = useTranslations("Company");
  const { data: companys } = api.admin.getAllCompany.useQuery();

  const handleCompanyChange = (value: string) => {
    setCompanyId(value);
  };

  return (
    <div className="flex ">
      <div className="flex-1">
        {companys && companys.length > 0 ? (
          <div className="flex">
            <Select onValueChange={handleCompanyChange}>
              <SelectTrigger className="w-full">
                <div>
                  <SelectValue placeholder={t("select_company")} />
                </div>
              </SelectTrigger>
              <SelectContent>
                {companys.map((company) => (
                  <SelectItem value={company.id.toString()} key={company.id}>
                    {company.company_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link href="/admin " className="p-2 hover:bg-secondary ">
              <PlusIcon />
            </Link>
          </div>
        ) : (
          <p>{t("no_company_yet")}</p>
        )}
      </div>
    </div>
  );
}
