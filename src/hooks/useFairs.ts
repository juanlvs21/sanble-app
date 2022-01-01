import {useState} from 'react';
import {useToast} from 'native-base';

import {useStateValue} from '@/context/app';
import {fairsConstants} from '@/constants/context';
import {getRecentFairsDB} from '@/helpers/queries/fairs';

export const useFairs = () => {
  const toast = useToast();
  const [{fairs: fairsStore}, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(true);

  const getRecentFairs = async () => {
    setLoading(true);
    try {
      const fairs = await getRecentFairsDB();
      dispatch({
        type: fairsConstants.SET_FAIRSLIST,
        payload: {list: fairs},
      });
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
    fairs: fairsStore.list,
    getRecentFairs,
  };
};
