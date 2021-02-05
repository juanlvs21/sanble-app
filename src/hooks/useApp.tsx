import { isPlatform } from "@ionic/react";
import { StatusBar } from "@ionic-native/status-bar";

const useApp = () => {
  const isMobile = () => {
    if (!isPlatform("mobileweb") && !isPlatform("desktop")) return true;
    else return false;
  };

  const setColorStatusBar = (color: string) => {
    if (isMobile()) StatusBar.backgroundColorByHexString(color);
  };

  const setOverlays = (overlays: boolean) => {
    if (isMobile()) StatusBar.overlaysWebView(overlays);
  };

  return {
    setColorStatusBar,
    setOverlays,
    isMobile,
  };
};

export default useApp;
