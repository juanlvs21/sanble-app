import { getPlatforms } from "@ionic/react";
import { appActions } from "@/context/actions/appActions";
import { useAppContext } from "@/context/AppContext";

export const useApp = () => {
  const [{ readyToUse }, dispatch] = useAppContext();
  const { setReadyToUse } = appActions(dispatch);

  const handleSetReady = (ready: boolean) => setReadyToUse(ready);

  const handleLoadData = async () => {
    console.log(getPlatforms());

    return "data";
  };

  return {
    readyToUse,
    handleSetReady,
    handleLoadData,
  };
};
