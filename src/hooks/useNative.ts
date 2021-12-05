import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";

export const useNative = () => {
  const { isNativePlatform } = Capacitor;
  const isNative = isNativePlatform();

  const setBgStatusBar = async (
    color: string = "#FFFFFF",
    theme: "Light" | "Dark" = "Light"
  ) => {
    if (isNative) {
      StatusBar.setBackgroundColor({ color });
      await StatusBar.setStyle({ style: Style[theme] });
    }
  };

  const hideStatusBar = async () => {
    await StatusBar.hide();
  };

  const showStatusBar = async () => {
    await StatusBar.show();
  };

  return {
    isNative,
    setBgStatusBar,
    hideStatusBar,
    showStatusBar,
  };
};
