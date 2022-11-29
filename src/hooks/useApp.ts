import { getPlatforms, ScrollDetail } from "@ionic/react";

import { appActions } from "@/context/actions/appActions";
import { useAppContext } from "@/context/AppContext";
import { getStorage } from "@/helpers/storage";
import { StorageHideMobileWelcomeKey } from "@/helpers/storageKeys";

export const useApp = () => {
  const platforms = getPlatforms();
  const [
    { readyToUse, showSidebar, scrollTop, isLoadingFull, hideMobileWelcome },
    dispatch,
  ] = useAppContext();
  const {
    setReadyToUse,
    setShowSidebar,
    setScrollTop,
    setIsLoadingFull,
    setHideMobileWelcome,
  } = appActions(dispatch);

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

  const handleLoadData = async () => {
    const hideMobileWelcome = await getStorage<boolean>(
      StorageHideMobileWelcomeKey
    );

    setHideMobileWelcome(hideMobileWelcome);
  };

  const handleShowSidebar = (show?: boolean) => {
    if (show === undefined) setShowSidebar(!showSidebar);
    else setShowSidebar(show);
  };

  const handleSetScrollTop = (event?: CustomEvent<ScrollDetail>) => {
    setScrollTop(event ? event.detail.scrollTop : 0);
  };

  return {
    handleSetReady,
    handleLoadData,
    handleShowSidebar,
    handleSetScrollTop,
    setIsLoadingFull,
    isPlatform,
    readyToUse,
    showSidebar,
    scrollTop,
    isLoadingFull,
    hideMobileWelcome,
    isMobile: isPlatform("mobile"),
    isCapacitor: isPlatform("capacitor"),
  };
};
