import {useState} from 'react';
import {useToast} from 'native-base';

import {useStateValue} from '@/context/app';
import {fairsConstants} from '@/constants/Context';
import {getUpcomingFairsDB, getListFairsDB} from '@/helpers/queries/fairs';

export const useFairs = () => {
  const toast = useToast();
  const [{fairs}, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(true);

  const getUpcomingFairs = async () => {
    setLoading(true);
    try {
      const upcoming = await getUpcomingFairsDB();
      dispatch({
        type: fairsConstants.SET_FAIRSUPCOMING,
        payload: {upcoming},
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

  const getListFairs = async () => {
    setLoading(true);
    try {
      const list = await getListFairsDB();
      dispatch({
        type: fairsConstants.SET_FAIRSLIST,
        payload: {list},
      });
    } catch (error) {
      toast.show({
        description: 'Error al cargar el listado de ferias',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fairsList: fairs.list,
    fairUpcoming: fairs.upcoming,
    getUpcomingFairs,
    getListFairs,
  };
};
