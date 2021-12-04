import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setShowWelcome } from "@/store/slices/appSlice";
import { setData } from "@/helpers/storage";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const showWelcome = useAppSelector(({ app }) => app.showWelcome);

  const handleSetShowWelcome = async (show: boolean) => {
    await setData("showWelcome", show);
    dispatch(setShowWelcome(show));
  };

  return {
    showWelcome,
    handleSetShowWelcome,
  };
};
