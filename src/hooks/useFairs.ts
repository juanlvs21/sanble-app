import {useState} from 'react';
import {useToast} from 'native-base';

import {useAppSelector, useAppDispatch} from '@/hooks/useStore';
import {setUpcomingFairsAction} from '@/store/slices/fairsSlice';
import {geUpcomingFairsDB} from '@/helpers/queries/fairs';

export const useFairs = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const fairsListStore = useAppSelector(({fairs}) => fairs.list);
  const fairsUpcomingStore = useAppSelector(({fairs}) => fairs.upcoming);
  const [loading, setLoading] = useState<boolean>(true);

  const getUpcomingFairs = async () => {
    setLoading(true);
    try {
      const fairs = await geUpcomingFairsDB();

      dispatch(setUpcomingFairsAction(fairs));
    } catch (error) {
      toast.show({
        description: 'Error al cargar las próximas ferias',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fairsList: fairsListStore,
    fairUpcoming: fairsUpcomingStore,
    getUpcomingFairs,
  };
};
