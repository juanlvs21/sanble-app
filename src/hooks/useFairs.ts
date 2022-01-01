import {useState} from 'react';
import {useToast} from 'native-base';

import {useAppDispatch, useAppSelector} from './useStore';
import {getRecentFairsDB} from '../helpers/firebase/queries';
import {setFairsAction} from '../store/slices/fairsSlice';

export const useFairs = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const fairsStore = useAppSelector(({fairs}) => fairs.list);

  const getRecentFairs = async () => {
    setLoading(true);
    try {
      const fairs = await getRecentFairsDB();
      dispatch(setFairsAction(fairs));
    } catch (error) {
      toast.show({
        description: 'Error al cargar las próximas ferias',
        status: 'error',
      });
    } finally {
      setLoading(true);
    }
  };

  return {
    loading,
    fairs: fairsStore,
    getRecentFairs,
  };
};
