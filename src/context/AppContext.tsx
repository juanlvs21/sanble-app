import React, { createContext, useState } from "react";

export const DataContext: any = createContext({
  darkMode: {
    toggle: null,
    initDarkMode: null,
    toggleDarkMode: null,
  },
  session: null,
});

export const AppProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);

  const setDarkModeApp = (value: boolean) => {
    setDarkMode(value);
    localStorage.setItem("darkMode", value ? "true" : "false");
  };

  const setSessionUser = async (data: any) => {
    setSession(data);
    if (data) localStorage.setItem("session", btoa(JSON.stringify(data)));
    else localStorage.removeItem("session");
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
