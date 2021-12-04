import { useAppDispatch } from "@/hooks/useStore";
import { setData, getData } from "@/helpers/storage";
import { setShowSplashAction, setShowWelcome } from "@/store/slices/appSlice";

export const useStorage = () => {
  const dispatch = useAppDispatch();

  const getDataStore = async () => {
    const show = await getData<boolean>("showWelcome");
    await setData("showWelcome", show || false);
    dispatch(setShowWelcome(show || false));

    dispatch(setShowSplashAction(false));
  };

  return {
    getDataStore,
  };
};
