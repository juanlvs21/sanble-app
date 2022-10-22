import { getPlatforms, ScrollDetail } from "@ionic/react";

import { appActions } from "@/context/actions/appActions";
import { useAppContext } from "@/context/AppContext";

export const useApp = () => {
  const [
    { readyToUse, isCapacitor, showSidebar, scrollTop, isLoadingFull },
    dispatch,
  ] = useAppContext();
  const {
    setReadyToUse,
    setIsCapacitor,
    setShowSidebar,
    setScrollTop,
    setIsLoadingFull,
  } = appActions(dispatch);

  const handleSetReady = (ready: boolean) => setReadyToUse(ready);

  const handleLoadData = async () => {
    const platforms = getPlatforms();

    if (platforms.includes("capacitor")) setIsCapacitor(true);
  };

  const handleShowSidebar = (show?: boolean) => {
    if (show === undefined) setShowSidebar(!showSidebar);
    else setShowSidebar(show);
  };

  const handleSeScrollTop = (event?: CustomEvent<ScrollDetail>) => {
    setScrollTop(event ? event.detail.scrollTop : 0);
  };

  return {
    readyToUse,
    isCapacitor,
    showSidebar,
    scrollTop,
    isLoadingFull,
    handleSetReady,
    handleLoadData,
    handleShowSidebar,
    handleSeScrollTop,
    setIsLoadingFull,
  };
};
