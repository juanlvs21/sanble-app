import { useQuery } from "@tanstack/react-query";

import { TFair } from "@/types/TFairs";
import { getFairBestListFetcher } from "@/services";

export const useHome = () => {
  const {
    data: fairsBestData,
    refetch: refetchFairsBest,
    isFetching: isLoadingFairsBest,
  } = useQuery<TFair[]>(["fairs-best"], getFairBestListFetcher, {
    enabled: false,
  });

  const {
    data: standsBestData,
    refetch: refetchStandsBest,
    isFetching: isLoadingStandsBest,
  } = useQuery<TFair[]>(["stands-best"], getFairBestListFetcher, {
    enabled: false,
  });

  return {
    isLoadingFairsBest,
    isLoadingStandsBest,
    fairsBest: fairsBestData,
    standsBest: standsBestData,
    handleLoadFairsBest: refetchFairsBest,
    handleLoadStandsBest: refetchStandsBest,
  };
};
