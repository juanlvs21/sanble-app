import {useState} from 'react';
import {useToast} from 'native-base';

import {useAppSelector, useAppDispatch} from '@/hooks/useStore';
import {setBestsStandsAction} from '@/store/slices/standsSlice';
import {getBestStandsDB} from '@/helpers/queries/stands';

export const useStands = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const bestsStandsStore = useAppSelector(({stands}) => stands.bests);
  const listStandsStore = useAppSelector(({stands}) => stands.list);
  const [loading, setLoading] = useState<boolean>(true);

  const getBestStands = async () => {
    setLoading(true);
    try {
      const stands = await getBestStandsDB();
      dispatch(setBestsStandsAction(stands));
    } catch (error) {
      toast.show({
        description: 'Error al cargar los mejores stands',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    standsList: listStandsStore,
    standsBests: bestsStandsStore,
    getBestStands,
  };
};
