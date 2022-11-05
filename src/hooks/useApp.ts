import { getPlatforms, ScrollDetail } from "@ionic/react";

import { appActions } from "@/context/actions/appActions";
import { useAppContext } from "@/context/AppContext";

export const useApp = () => {
  const platforms = getPlatforms();
  const [{ readyToUse, showSidebar, scrollTop, isLoadingFull }, dispatch] =
    useAppContext();
  const { setReadyToUse, setShowSidebar, setScrollTop, setIsLoadingFull } =
    appActions(dispatch);

  const isPlatform = (
    platf:
      | "ios"
      | "ipad"
      | "iphone"
      | "android"
      | "phablet"
      | "tablet"
      | "cordova"
      | "capacitor"
      | "electron"
      | "pwa"
      | "mobile"
      | "mobileweb"
      | "desktop"
      | "hybrid"
  ) => platforms.includes(platf);

  const handleSetReady = (ready: boolean) => setReadyToUse(ready);

  const handleLoadData = async () => {};

  const handleShowSidebar = (show?: boolean) => {
    if (show === undefined) setShowSidebar(!showSidebar);
    else setShowSidebar(show);
  };

  const handleSeScrollTop = (event?: CustomEvent<ScrollDetail>) => {
    setScrollTop(event ? event.detail.scrollTop : 0);
  };

  return {
    handleSetReady,
    handleLoadData,
    handleShowSidebar,
    handleSeScrollTop,
    setIsLoadingFull,
    isPlatform,
    readyToUse,
    showSidebar,
    scrollTop,
    isLoadingFull,
    isMobile: isPlatform("capacitor"),
    isCapacitor: isPlatform("mobile"),
  };
};
