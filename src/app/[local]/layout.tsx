import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import { SessionProvider } from "~/app/_context/SessionContext";
import { validateRequest } from "~/server/lucia/validateRequests";
import { ThemeProvider } from "../_context/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Company",
  description: "véhicules",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await validateRequest();

  return (
    <html lang={locale}>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
