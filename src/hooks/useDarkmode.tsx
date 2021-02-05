import { useContext } from "react";

// Context
import { DataContext } from "../context/AppContext";

const useDarkmode = () => {
  const { darkMode, setDarkModeApp } = useContext(DataContext);

  const initDarkMode = () => {
    const dark: any = localStorage.getItem("darkMode");
    if (dark === "true" && !document.body.classList.contains("dark")) {
      toggleDarkMode();
    }
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      setDarkModeApp(true);
    } else {
      setDarkModeApp(false);
    }
  };

  return {
    darkMode,
    toggleDarkMode,
    initDarkMode,
  };
};

export default useDarkmode;
