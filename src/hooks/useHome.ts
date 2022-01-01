import {useFairs} from '@/hooks/useFairs';
import {useStands} from '@/hooks/useStands';

export const useHome = () => {
  const {getRecentFairs, fairs, loading: fairsLoading} = useFairs();
  const {getBestStands, stands, loading: standsLoading} = useStands();

  const handleRefresh = async () => {
    await Promise.all([getRecentFairs(), getBestStands()]);
  };

  return {
    handleRefresh,
    fairs,
    fairsLoading,
    stands,
    standsLoading,
  };
};
