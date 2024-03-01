import React from "react";
import { useTranslations } from "next-intl";

export default function Page() {
  const translated = useTranslations("Index");

  return (
    <div>
      hello
      <h1>{translated("title")}</h1>
      <h2>{translated("description")}</h2>
    </div>
  );
}
