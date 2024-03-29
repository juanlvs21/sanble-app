import { StatusBar, Style } from "@capacitor/status-bar";

import { colors, EColors } from "@/helpers/colors";
import { useApp } from "@/hooks/useApp";

export const useStatusBar = () => {
  const { isCapacitor } = useApp();

  const hideStatusBar = async () => {
    if (isCapacitor) await StatusBar.hide();
  };

  const showStatusBar = async () => {
    if (isCapacitor) await StatusBar.show();
  };

  const setStatusBarStyleDark = async () => {
    if (isCapacitor) await StatusBar.setStyle({ style: Style.Dark });
  };

  const setStatusBarStyleLight = async () => {
    if (isCapacitor) await StatusBar.setStyle({ style: Style.Light });
  };

  const overlaysStatusBar = async (overlay: boolean = false) => {
    if (isCapacitor) {
      await StatusBar.setBackgroundColor({ color: colors.white });
      await StatusBar.setOverlaysWebView({ overlay });
      await StatusBar.setStyle({ style: Style.Light });
    }
  };

  const backgroundStatusBar = async (color: EColors = EColors.LIGH) => {
    if (color === EColors.DARK) setStatusBarStyleDark();
    else setStatusBarStyleLight();

    if (isCapacitor) {
      await StatusBar.setBackgroundColor({ color: colors[color] });
    }
  };

  return {
    hideStatusBar,
    setStatusBarStyleDark,
    setStatusBarStyleLight,
    showStatusBar,
    overlaysStatusBar,
    backgroundStatusBar,
  };
};
