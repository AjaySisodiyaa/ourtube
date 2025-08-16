import React, { createContext, useState, useContext } from "react";

// 1. Create context
const GlobalStateContext = createContext();

// 2. Create provider component
export const GlobalStateProvider = ({ children }) => {
  const [open, setOpen] = useState("");
  console.log(open);
  return (
    <GlobalStateContext.Provider value={{ open, setOpen }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// 3. Custom hook to access context
export const useGlobalState = () => useContext(GlobalStateContext);
