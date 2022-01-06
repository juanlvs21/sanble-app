import {useStorate} from '@/hooks/useStorate';
import {useStateValue} from '@/context/app';
import {appConstants} from '@/constants/Context';

export const useApp = () => {
  const [{app}, dispatch] = useStateValue();
  const {handleGetStorage, handleSetStorage} = useStorate();

  const handleSetFirstLoad = () => {
    dispatch({
      type: appConstants.SET_FIRSTLOAD,
      payload: {firstLoad: false},
    });
  };

  const handleSetShowWelcome = async (value: boolean) => {
    await handleSetStorage('show_welcome', value);
    dispatch({
      type: appConstants.SET_SHOWWELCOME,
      payload: {showWelcome: value},
    });
  };

  const handleGetShowWelcome = async () => {
    const showWelcome = await handleGetStorage('show_welcome');
    dispatch({
      type: appConstants.SET_SHOWWELCOME,
      payload: {showWelcome: showWelcome},
    });
  };

  return {
    firstLoad: app.firstLoad,
    handleSetFirstLoad,
    showWelcome: app.showWelcome,
    handleSetShowWelcome,
    handleGetShowWelcome,
  };
};
