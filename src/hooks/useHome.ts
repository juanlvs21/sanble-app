import { useFairs } from "@/hooks/useFairs";

export const useHome = () => {
  const { getUpcomingFairs, fairsUpcoming, loading: fairsLoading } = useFairs();

  const handleRefresh = async () => {
    await Promise.all([getUpcomingFairs()]);
  };

  return {
    handleRefresh,
    fairs: fairsUpcoming,
    fairsLoading,
  };
};
