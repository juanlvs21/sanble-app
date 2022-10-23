import { useQuery } from "@tanstack/react-query";

import { getFairListFetcher } from "@/services";

export const useFairs = () => {
  const { data: fairsListData, refetch: refetchFairsList } = useQuery(
    ["fairs-list"],
    getFairListFetcher
  );

  return {
    fairsList: fairsListData,
    refetchFairsList,
  };
};
