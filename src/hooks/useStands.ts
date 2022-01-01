import {useState} from 'react';
import {useToast} from 'native-base';

import {useAppDispatch, useAppSelector} from '@/hooks/useStore';
import {getBestStandsDB} from '@/helpers/queries/stands';
import {setStandsAction} from '@/store/slices/standsSlice';

export const useStands = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const standsStore = useAppSelector(({stands}) => stands.list);

  const getBestStands = async () => {
    setLoading(true);
    try {
      const stands = await getBestStandsDB();
      dispatch(setStandsAction(stands));
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
    stands: standsStore,
    getBestStands,
  };
};
