import {useAppSelector, useAppDispatch} from '@/hooks/useStore';
import {setFirstLoadAction} from '@/store/slices/appSlice';

export const useApp = () => {
  const dispatch = useAppDispatch();
  const firstLoadStore = useAppSelector(({app}) => app.firstLoad);

  const handlesetFirstLoad = () => {
    dispatch(setFirstLoadAction(false));
  };

  return {
    firstLoad: firstLoadStore,
    handlesetFirstLoad,
  };
};
