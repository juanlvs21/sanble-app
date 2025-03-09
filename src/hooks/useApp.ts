import { Device } from "@capacitor/device";
import { getPlatforms, ScrollDetail } from "@ionic/react";

import { appActions } from "@/context/actions/appActions";
import { useAppContext } from "@/context/AppContext";
import { isNative } from "@/helpers/native";
import { getStorage } from "@/helpers/storage";
import { StorageHideMobileWelcomeKey } from "@/helpers/storageKeys";

export const useApp = () => {
  const platforms = getPlatforms();
  const [
    {
      readyToUse,
      showSidebar,
      scrollTop,
      isLoadingFull,
      hideMobileWelcome,
      deviceID,
    },
    dispatch,
  ] = useAppContext();
  const {
    setReadyToUse,
    setShowSidebar,
    setScrollTop,
    setIsLoadingFull,
    setHideMobileWelcome,
    setDeviceID,
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

  const handleGetDeviceID = async () => {
    const { identifier } = await Device.getId();
    if (identifier) setDeviceID(identifier);
  };

  return {
    handleSetReady,
    handleLoadData,
    handleShowSidebar,
    handleSetScrollTop,
    handleGetDeviceID,
    setIsLoadingFull,
    isPlatform,
    readyToUse,
    showSidebar,
    scrollTop,
    isLoadingFull,
    hideMobileWelcome,
    deviceID,
    isMobile: isNative() || isPlatform("mobile"),
    isCapacitor: isNative() || isPlatform("capacitor"),
  };
};
