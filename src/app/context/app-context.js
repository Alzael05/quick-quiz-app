"use client";

import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [data, setData] = useState({});

  return <AppContext.Provider value={{ data, setData }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be inside AppContextProvider");
  }

  return context;
}
