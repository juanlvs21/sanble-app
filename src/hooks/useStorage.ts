import { SplashScreen } from "@capacitor/splash-screen";

import { useAppDispatch } from "@/hooks/useStore";
import { useNative } from "@/hooks/useNative";
import { useAuth } from "@/hooks/useAuth";
import {
  setShowSplashAction,
  setShowWelcomeAction,
} from "@/store/slices/appSlice";
import { setUserAction, setLoggedAction } from "@/store/slices/authSlice";
import { getData } from "@/helpers/storage";
import { TUser } from "@/types/TUser";

export const useStorage = () => {
  const { isNative } = useNative();
  const { handleGeSession } = useAuth();
  const dispatch = useAppDispatch();

  const getDataStore = async () => {
    if (isNative) await SplashScreen.hide();

    handleGeSession();

    const show = await getData<boolean>("showWelcome");
    const logged = await getData<boolean>("logged");
    const user = await getData<TUser>("user");

    dispatch(setShowWelcomeAction(show || false));
    dispatch(setUserAction(user));
    dispatch(setLoggedAction(logged));
    dispatch(setShowSplashAction(false));
  };

  return {
    getDataStore,
  };
};
