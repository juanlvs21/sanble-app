import {useState} from 'react';
import {useToast} from 'native-base';

import {setFairsAction} from '../store/slices/fairsSlice';
import {useAppDispatch, useAppSelector} from './useStore';

export const useFairs = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const fairsStore = useAppSelector(({fairs}) => fairs.list);

  const getRecentFairs = async () => {
    try {
      // const fairs = await getRecentFairsDB();
      dispatch(setFairsAction([]));
    } catch (error) {
      toast.show({
        description: 'Error al cargar las próximas ferias',
        status: 'error',
      });
    }
  };

  const handleGetRecentFairs = async () => {
    setLoading(true);
    await getRecentFairs();
    setLoading(false);
  };

  const handleRefresh = async () => {
    await Promise.all([getRecentFairs()]);
  };

  return {
    loading,
    fairs: fairsStore,
    getRecentFairs,
    handleGetRecentFairs,
    handleRefresh,
  };
};
