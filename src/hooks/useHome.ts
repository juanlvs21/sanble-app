import {useFairs} from '@/hooks/useFairs';
import {useStands} from '@/hooks/useStands';
import {useApp} from '@/hooks/useApp';

export const useHome = () => {
  const {handlesetFirstLoad} = useApp();
  const {getRecentFairs, fairs, loading: fairsLoading} = useFairs();
  const {getBestStands, stands, loading: standsLoading} = useStands();

  const handleRefresh = async () => {
    await Promise.all([getRecentFairs(), getBestStands()]);
    handlesetFirstLoad();
  };

  return {
    handleRefresh,
    fairs,
    fairsLoading,
    stands,
    standsLoading,
  };
};
