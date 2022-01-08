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

  const handleSetHideWelcome = async (value: boolean) => {
    await handleSetStorage('show_welcome', value);
    dispatch({
      type: appConstants.SET_SHOWHIDEWELCOME,
      payload: {hideWelcome: value},
    });
  };

  const handleGetHideWelcome = async () => {
    const hideWelcome = await handleGetStorage('show_welcome');
    dispatch({
      type: appConstants.SET_SHOWHIDEWELCOME,
      payload: {hideWelcome},
    });
  };

  return {
    firstLoad: app.firstLoad,
    handleSetFirstLoad,
    hideWelcome: app.hideWelcome,
    handleSetHideWelcome,
    handleGetHideWelcome,
  };
};
