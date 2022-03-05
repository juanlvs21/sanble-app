import { useFairs } from "@/hooks/useFairs";
import { useStands } from "@/hooks/useStands";

export const useHome = () => {
  const { getUpcomingFairs, fairsUpcoming, loading: fairsLoading } = useFairs();
  const { getBestStands, standsBests, loading: standsLoading } = useStands();

  const handleRefresh = async () => {
    await Promise.all([getUpcomingFairs(), getBestStands()]);
  };

  return {
    handleRefresh,
    fairs: fairsUpcoming,
    fairsLoading,
    stands: standsBests,
    standsLoading,
  };
};
