import React, { createContext } from "react";

export const UserContext = createContext({
  isCarOpen: false,
  setIsCarOpen: (value: boolean) => {
    // Provide an implementation for the method
  },
  isClientOpen: false,
  setClientIsOpen: (value: boolean) => {
    // Provide an implementation for the method
  },
});
