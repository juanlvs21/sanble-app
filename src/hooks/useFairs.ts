import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getFairListFetcher } from "@/services";
import { TFair } from "@/types/TFairs";
import { TPaginationParams } from "@/types/TPagination";

type hookType = {
  defaultPerPage?: number;
};

export const useFairs = (hookParams: hookType) => {
  const [listPage, setListPage] = useState(1);
  const [listPerPage, setListPerPage] = useState(hookParams.defaultPerPage);
  const [list, setlist] = useState<TFair[]>([]);

  const {
    data: fairsListData,
    refetch: refetchFairsList,
    isFetching: isLoadingFairsList,
  } = useQuery(["fairs-list", listPage, listPerPage], () =>
    getFairListFetcher(list, { page: listPage, perPage: listPerPage })
  );

  useEffect(() => {
    if (fairsListData) setlist(fairsListData?.fairs);
  }, [fairsListData]);

  const handleLoadFairList = async (params?: TPaginationParams) => {
    setListPage(params?.page || 1);
    setListPerPage(params?.perPage || hookParams.defaultPerPage);
    await refetchFairsList();
  };

  const handleRefreshFairList = async () => {
    await handleLoadFairList({ page: 1, perPage: hookParams.defaultPerPage });
  };

  const handleInfiniteFairList = async () => {
    const nextPage = listPage + 1;
    const currentPage = fairsListData?.pagination.totalPages || 1;

    if (nextPage <= currentPage) {
      await handleLoadFairList({ page: nextPage });
    }
  };

  return {
    fairsList: list,
    isLoadingFairsList,
    handleLoadFairList,
    handleRefreshFairList,
    handleInfiniteFairList,
  };
};
