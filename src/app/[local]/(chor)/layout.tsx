import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";
import Header from "~/components/header";
import Nav from "~/components/nav";
import { Toaster } from "~/components/ui/sonner";

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
          <div className="relative flex h-full ">
            <Toaster duration={2000} />

            <Nav />
            <div className="  absolute h-full w-full overflow-auto pl-44">
              {children}
            </div>
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
