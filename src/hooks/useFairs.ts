import { useQuery } from "@tanstack/react-query";

import { getFairListFetcher } from "@/services";

export const useFairs = () => {
  const {
    data: fairsListData,
    refetch: refetchFairsList,
    isFetching: isLoadingFairsList,
  } = useQuery(["fairs-list"], getFairListFetcher);

  return {
    fairsList: fairsListData,
    isLoadingFairsList,
    refetchFairsList,
  };
};
