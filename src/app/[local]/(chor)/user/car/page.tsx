"use client";
import React from "react";
import { api } from "~/trpc/react";
import { useSession } from "~/app/_context/SessionContext";
import { redirect } from "next/navigation";
import CreateCarForm from "../components/createCarForm";

export default function Page() {
  const { session, user } = useSession();
  if (!session || !user) {
    redirect("/login");
  }
  const {
    data: company,
    isSuccess,
    isLoading,
  } = api.user.getUserCompany.useQuery(parseInt(user.id));
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isSuccess &&
    company && <CreateCarForm company_id={company.compagny.id.toString()} />
  );
}
