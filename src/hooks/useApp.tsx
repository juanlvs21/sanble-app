import { useContext } from "react";
import { isPlatform } from "@ionic/react";
import { StatusBar } from "@ionic-native/status-bar";

// Context
import { DataContext } from "../context/AppContext";

const useApp = () => {
  const { firstWelcome, setWelcome } = useContext(DataContext);

  const isDesktop = () => {
    if (isPlatform("desktop")) return true;
    else return false;
  };

  const isMobile = () => {
    if (!isPlatform("mobileweb") && !isPlatform("desktop")) return true;
    else return false;
  };

  const isMobileWeb = () => {
    if (isPlatform("mobileweb")) return true;
    else return false;
  };

  const setColorStatusBar = (color: string) => {
    if (isMobile()) StatusBar.backgroundColorByHexString(color);
  };

  const setOverlays = (overlays: boolean) => {
    if (isMobile()) StatusBar.overlaysWebView(overlays);
  };

  const initWelcome = () => {
    const welcome: any = localStorage.getItem("welcome");
    if (!isMobile()) setWelcome(false);
    else if (welcome === "true") setWelcome(true);
    else if (welcome === "false") setWelcome(false);
    else setWelcome(true);
  };

  return {
    setColorStatusBar,
    setOverlays,
    isDesktop,
    isMobile,
    isMobileWeb,
    initWelcome,
    firstWelcome,
    setWelcome,
  };
};

export default useApp;
