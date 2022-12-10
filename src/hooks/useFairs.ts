import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import {
  getFairDetailsFetcher,
  getFairListGeolocationFetcher,
  getFairListInfiniteScrollFetcher,
} from "@/services";
import { TFair, TFairGeo } from "@/types/TFair";
import { TPaginationParams } from "@/types/TPagination";
import { TResponseList } from "@/types/THttp";

type THookParams = {
  defaultPerPage?: number;
  fairID?: string;
};

export const useFairs = (hookParams?: THookParams) => {
  const navigate = useNavigate();

  const [listPage, setListPage] = useState(1);
  const [listPerPage, setListPerPage] = useState(hookParams?.defaultPerPage);
  const [list, setList] = useState<TFair[]>([]);

  const {
    data: fairsListData,
    refetch: refetchFairsList,
    isFetching: isLoadingFairsList,
  } = useQuery<TResponseList<TFair[]>>(
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

  const {
    data: fairDetailsData,
    refetch: refetchFairDetails,
    isFetching: isLoadingFairDetails,
  } = useQuery<TFair>(
    ["fairs-details", hookParams?.fairID],
    () => getFairDetailsFetcher(hookParams?.fairID || ""),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (fairsListData) setList(fairsListData?.list);
  }, [fairsListData]);

  const handleLoadFairsList = async (params?: TPaginationParams) => {
    setListPage(params?.page || 1);
    setListPerPage(params?.perPage || hookParams?.defaultPerPage);
    await refetchFairsList();
  };

  const handleRefreshFairList = async () => {
    await handleLoadFairsList({
      page: 1,
      perPage: hookParams?.defaultPerPage || 10,
    });
  };

  const handleInfiniteFairList = async () => {
    const nextPage = listPage + 1;
    const currentPage = fairsListData?.pagination.totalPages || 1;

    if (nextPage <= currentPage) {
      await handleLoadFairsList({ page: nextPage });
    }
  };

  const prepareListGeo = () =>
    formatFairsMarks(fairsListGeoData || [], (id, name) =>
      navigate(`/app/ferias/${id}`, {
        state: {
          fairID: id,
          fairName: name,
        },
      })
    );

  return {
    fairsList: fairsListData,
    fairsListGeo: prepareListGeo(),
    fairDetails: fairDetailsData,
    isLoadingFairsList,
    isLoadingFairsListGeo,
    isLoadingFairDetails,
    handleRefreshFairList,
    handleInfiniteFairList,
    handleLoadFairsList,
    handleLoadFairsListGeo: refetchFairsListGeo,
    handleLoadFairDetails: refetchFairDetails,
  };
};
