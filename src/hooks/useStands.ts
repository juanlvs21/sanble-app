import {useState} from 'react';
import {useToast} from 'native-base';

import {useStateValue} from '@/context/app';
import {standsConstants} from '@/constants/Context';
import {getBestStandsDB} from '@/helpers/queries/stands';

export const useStands = () => {
  const toast = useToast();
  const [{stands}, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(true);

  const getBestStands = async () => {
    setLoading(true);
    try {
      const bests = await getBestStandsDB();
      dispatch({
        type: standsConstants.SET_STANDSBESTS,
        payload: {bests},
      });
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
    standsList: stands.list,
    standsBests: stands.bests,
    getBestStands,
  };
};
