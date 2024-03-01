"use client";
import { createContext, useContext } from "react";
import type { validateRequest } from "~/server/lucia/validateRequests";

type ContextType = Awaited<ReturnType<typeof validateRequest>>;

const SessionContext = createContext<ContextType>({
  session: null,
  user: null,
});
export const useSession = () => useContext(SessionContext);

// provider
export const SessionProvider: React.FC<{
  session: ContextType;
  children: React.ReactNode;
}> = ({ session, children }) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
