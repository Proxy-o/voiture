import { createContext } from "react";
import type { Car, Client } from "../../types";

export type UserContextType = {
  isCarOpen: boolean;
  setIsCarOpen: (value: boolean) => void;
  isClientOpen: boolean;
  setClientIsOpen: (value: boolean) => void;
  selectedCar: Car | undefined;
  setSelectedCar: (value: Car | undefined) => void;
  selectedClient: Client | undefined;
  setSelectedClient: (value: Client | undefined) => void;
};
export const UserContext = createContext<UserContextType | null>(null);
