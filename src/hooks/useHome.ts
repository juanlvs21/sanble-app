import {useFairs} from '@/hooks/useFairs';
import {useStands} from '@/hooks/useStands';
import {useApp} from '@/hooks/useApp';

export const useHome = () => {
  const {handlesetFirstLoad} = useApp();
  const {getUpcomingFairs, fairUpcoming, loading: fairsLoading} = useFairs();
  const {getBestStands, standsBests, loading: standsLoading} = useStands();

  const handleRefresh = async () => {
    await Promise.all([getUpcomingFairs(), getBestStands()]);
    handlesetFirstLoad();
  };

  return {
    handleRefresh,
    fairs: fairUpcoming,
    fairsLoading,
    stands: standsBests,
    standsLoading,
  };
};
