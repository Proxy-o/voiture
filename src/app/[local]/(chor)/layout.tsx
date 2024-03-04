import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";
import Header from "~/components/header";
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
      <div className=" h-screen w-full  ">
        <div className="flex h-full  flex-col gap-1">
          <Header />
          <div className="flex h-full ">
            <Nav />
            <div className="  w-full overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
