import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import {
  getFairListGeolocationFetcher,
  getFairListInfiniteScrollFetcher,
} from "@/services";
import { FairsListResponse, TFair, TFairGeo } from "@/types/TFairs";
import { TPaginationParams } from "@/types/TPagination";

export const useFairs = (hookParams = { defaultPerPage: 1 }) => {
  const navigate = useNavigate();

  const [listPage, setListPage] = useState(1);
  const [listPerPage, setListPerPage] = useState(hookParams?.defaultPerPage);
  const [list, setList] = useState<TFair[]>([]);

  const {
    data: fairsListData,
    refetch: refetchFairsList,
    isFetching: isLoadingFairsList,
  } = useQuery<FairsListResponse>(
    ["fairs-list", listPage, listPerPage],
    () =>
      // TODO: This fetcher must be different if it is mobile or if it is desktop
      getFairListInfiniteScrollFetcher(list, {
        page: listPage,
        perPage: listPerPage,
      }),
    { enabled: false }
  );

  const {
    data: fairsListGeoData,
    refetch: refetchFairsListGeo,
    isFetching: isLoadingFairsListGeo,
  } = useQuery<TFairGeo[]>(["fairs-list-geo"], getFairListGeolocationFetcher, {
    enabled: false,
  });

  useEffect(() => {
    if (fairsListData) setList(fairsListData?.fairs);
  }, [fairsListData]);

  const handleLoadFairsList = async (params?: TPaginationParams) => {
    setListPage(params?.page || 1);
    setListPerPage(params?.perPage || hookParams?.defaultPerPage);
    await refetchFairsList();
  };

  const handleRefreshFairList = async () => {
    await handleLoadFairsList({ page: 1, perPage: hookParams.defaultPerPage });
  };

  const handleInfiniteFairList = async () => {
    const nextPage = listPage + 1;
    const currentPage = fairsListData?.pagination.totalPages || 1;

    if (nextPage <= currentPage) {
      await handleLoadFairsList({ page: nextPage });
    }
  };

  const prepareListGeo = () =>
    formatFairsMarks(fairsListGeoData || [], (id) =>
      navigate(`/app/ferias/${id}`)
    );

  return {
    fairsList: fairsListData,
    fairsListGeo: prepareListGeo(),
    isLoadingFairsList,
    isLoadingFairsListGeo,
    handleRefreshFairList,
    handleInfiniteFairList,
    handleLoadFairsList,
    handleLoadFairsListGeo: refetchFairsListGeo,
  };
};
