import React from "react";
import CreateCompanyForm from "./components/createCompanyForm";
import CreateUserForm from "./components/createUserForm";

export default function Page() {
  return (
    <div>
      <CreateCompanyForm />
      <CreateUserForm />
    </div>
  );
}
