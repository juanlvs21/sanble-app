import React, { createContext, useState } from "react";

export const DataContext: any = createContext({
  darkMode: {
    toggle: null,
    initDarkMode: null,
    toggleDarkMode: null,
  },
  user: null,
  access: null,
});

export const AppProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const initDarkMode = () => {
    const darkMode: any = localStorage.getItem("darkMode");
    if (darkMode === "true" && !document.body.classList.contains("dark")) {
      toggleDarkMode();
    }
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("darkMode", "true");
      setDarkMode(true);
    } else {
      localStorage.setItem("darkMode", "false");
      setDarkMode(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        darkMode: {
          toggle: darkMode,
          initDarkMode,
          toggleDarkMode,
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
