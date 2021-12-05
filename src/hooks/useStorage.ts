import { SplashScreen } from "@capacitor/splash-screen";

import { useAppDispatch } from "@/hooks/useStore";
import { useNative } from "@/hooks/useNative";
import { getData } from "@/helpers/storage";
import { setShowSplashAction, setShowWelcome } from "@/store/slices/appSlice";

export const useStorage = () => {
  const { isNative } = useNative();
  const dispatch = useAppDispatch();

  const getDataStore = async () => {
    const show = await getData<boolean>("showWelcome");
    dispatch(setShowWelcome(show || false));

    dispatch(setShowSplashAction(false));

    if (isNative) await SplashScreen.hide();
  };

  return {
    getDataStore,
  };
};
