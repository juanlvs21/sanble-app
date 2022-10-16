import { getPlatforms, ScrollDetail } from "@ionic/react";

import { appActions } from "@/context/actions/appActions";
import { useAppContext } from "@/context/AppContext";

export const useApp = () => {
  const [{ readyToUse, isDesktop, showSidebar, scrollTop }, dispatch] =
    useAppContext();
  const { setReadyToUse, setIsDesktop, setShowSidebar, setScrollTop } =
    appActions(dispatch);

  const handleSetReady = (ready: boolean) => setReadyToUse(ready);

  const handleLoadData = async () => {
    const platforms = getPlatforms();
    if (platforms.includes("desktop")) {
      setIsDesktop(true);
    }
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
    isDesktop,
    showSidebar,
    scrollTop,
    handleSetReady,
    handleLoadData,
    handleShowSidebar,
    handleSeScrollTop,
  };
};
