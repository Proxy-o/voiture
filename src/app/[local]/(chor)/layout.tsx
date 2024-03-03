import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";
import Nav from "~/components/nav";

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex  gap-1">
        <Nav />
        <div className="  h-screen w-full overflow-auto">{children}</div>
      </div>
    </NextIntlClientProvider>
  );
}
