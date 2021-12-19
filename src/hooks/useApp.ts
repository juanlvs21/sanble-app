import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setShowWelcomeAction } from "@/store/slices/appSlice";
import { setData } from "@/helpers/storage";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const showWelcome = useAppSelector(({ app }) => app.showWelcome);
  const showSplash = useAppSelector(({ app }) => app.showSplash);
  const uiMode = useAppSelector(({ app }) => app.uiMode);
  const loadingFullScreenStore = useAppSelector(
    ({ app }) => app.loadingFullScreen
  );

  const handleSetShowWelcome = async (show: boolean) => {
    await setData("showWelcome", show);
    dispatch(setShowWelcomeAction(show));
  };

  return {
    showSplash,
    uiMode,
    showWelcome,
    handleSetShowWelcome,
    loading: loadingFullScreenStore,
  };
};
