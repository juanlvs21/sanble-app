import { getPlatforms } from "@ionic/react";
import { appActions } from "@/context/actions/appActions";
import { useAppContext } from "@/context/AppContext";

export const useApp = () => {
  const [{ readyToUse, isDesktop, showSidebar }, dispatch] = useAppContext();
  const { setReadyToUse, setIsDesktop, setShowSidebar } = appActions(dispatch);

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

  return {
    readyToUse,
    isDesktop,
    showSidebar,
    handleSetReady,
    handleLoadData,
    handleShowSidebar,
  };
};
