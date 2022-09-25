import { getPlatforms } from "@ionic/react";
import { appActions } from "@/context/actions/appActions";
import { useAppContext } from "@/context/AppContext";

export const useApp = () => {
  const [{ readyToUse, isDesktop }, dispatch] = useAppContext();
  const { setReadyToUse, setIsDesktop } = appActions(dispatch);

  const handleSetReady = (ready: boolean) => setReadyToUse(ready);

  const handleLoadData = async () => {
    const platforms = getPlatforms();
    if (platforms.includes("desktop")) {
      setIsDesktop(true);
    }
  };

  return {
    readyToUse,
    isDesktop,
    handleSetReady,
    handleLoadData,
  };
};
