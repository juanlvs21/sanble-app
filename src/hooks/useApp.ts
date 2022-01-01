import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAppDispatch, useAppSelector} from '@/hooks/useStore';
import {setFirstLoadAction} from '@/store/slices/appSlice';

export const useApp = () => {
  const firstLoadStore = useAppSelector(({app}) => app.firstLoad);
  const dispatch = useAppDispatch();

  const handlesetFirstLoad = async () => {
    dispatch(setFirstLoadAction(false));
    try {
      await AsyncStorage.setItem('firstLoad', JSON.stringify(false));
    } catch (e) {
      console.log({e});
    }
  };

  return {
    firstLoad: firstLoadStore,
    handlesetFirstLoad,
  };
};
