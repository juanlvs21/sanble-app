import {useState} from 'react';
import {useToast} from 'native-base';

import {useStateValue} from '@/context/app';
import {standsConstants} from '@/constants/context';
import {getBestStandsDB} from '@/helpers/queries/stands';

export const useStands = () => {
  const toast = useToast();
  const [{stands: standsStore}, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(true);

  const getBestStands = async () => {
    setLoading(true);
    try {
      const stands = await getBestStandsDB();
      dispatch({
        type: standsConstants.SET_STANDSLIST,
        payload: {list: stands},
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
    stands: standsStore.list,
    getBestStands,
  };
};
