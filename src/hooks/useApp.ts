import {useStateValue} from '@/context/app';
import {appConstants} from '@/constants/Context';

export const useApp = () => {
  const [{app}, dispatch] = useStateValue();

  const handlesetFirstLoad = () => {
    dispatch({
      type: appConstants.SET_FIRSTLOAD,
      payload: {firstLoad: false},
    });
  };

  return {
    firstLoad: app.firstLoad,
    handlesetFirstLoad,
  };
};
