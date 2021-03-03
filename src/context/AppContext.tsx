import React, { createContext, useState } from "react";

export const DataContext: any = createContext({
  darkMode: {
    toggle: null,
    initDarkMode: null,
    toggleDarkMode: null,
  },
  session: null,
  usdValue: 0,
});

export const AppProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);
  const [firstWelcome, setFirstWelcome] = useState<boolean>(true);
  const [usdValue, setUsdValue] = useState<number>(0);

  const setDarkModeApp = (value: boolean) => {
    setDarkMode(value);
    localStorage.setItem("darkMode", value ? "true" : "false");
  };

  const setSessionUser = async (data: any) => {
    setSession(data);
    if (data) localStorage.setItem("session", btoa(JSON.stringify(data)));
    else localStorage.removeItem("session");
  };

  const setWelcome = (welcome: boolean) => {
    setFirstWelcome(welcome);
    localStorage.setItem("welcome", welcome.toString());
  };

  const getSessionStorage = async () => {
    const sessionStorage: string = localStorage.getItem("session") || "";
    if (sessionStorage) {
      const data = JSON.parse(atob(sessionStorage));
      setSession(data);
      return data;
    } else {
      setSession(null);
      return null;
    }
  };

  return (
    <DataContext.Provider
      value={{
        session,
        setSessionUser,
        getSessionStorage,
        darkMode,
        setDarkModeApp,
        firstWelcome,
        setWelcome,
        usdValue,
        setUsdValue,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
