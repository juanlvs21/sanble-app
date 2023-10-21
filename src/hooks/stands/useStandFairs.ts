import { useEffect, useState } from "react";
import useSWR from "swr";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { getFairStandsListRequest, getStandFairsListRequest } from "@/services";
import { TFair } from "@/types/TFair";
import { TPagination } from "@/types/THttp";

const DEFAULT_LAST_INDEX = 0;
const DEFAULT_LIMIT = 10;

export const useStandFairs = (standID: string) => {
  const { toast, toastDismiss } = useToast();
  const [fairs, setFairs] = useState<TFair[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const [pagination, setPagination] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX,
    limit: DEFAULT_LIMIT,
    total: 0,
  });

  const SWR_KEY_STANDS_FAIRS = `/stands/${standID}/fairs`;

  const { data, isLoading, mutate } = useSWR(
    SWR_KEY_STANDS_FAIRS,
    async () => await getStandFairsListRequest(standID, pagination),
    {
      onSuccess(data) {
        if (data) {
          const newList =
            pagination.lastIndex != 0
              ? infiteScrollData(
                  "id",
                  data.list,
                  data.pagination.lastIndex === DEFAULT_LAST_INDEX ? [] : fairs
                )
              : data.list;

          setFairs(newList || []);
          setPagination(data.pagination);
          setIsLoadMore(false);
        }
      },
      onError(error) {
        toastDismiss(SWR_KEY_STANDS_FAIRS);
        toast(error, { type: "error", toastId: SWR_KEY_STANDS_FAIRS });
      },
    }
  );

  const handleRefresh = async () => {
    setPagination({
      lastIndex: DEFAULT_LAST_INDEX,
      limit: DEFAULT_LIMIT,
      total: 0,
    });
    setIsRefresh(true);
  };

  const handleLoadMore = async () => {
    toastDismiss(SWR_KEY_STANDS_FAIRS);
    setIsLoadMore(true);
    mutate();
  };
  useEffect(() => {
    if (isRefresh) {
      mutate();
      setIsRefresh(false);
    }
  }, [isRefresh]);

  return {
    fairs,
    isLoading,
    isLoadMore,
    showLoadMoreBtn:
      pagination.total > DEFAULT_LIMIT && fairs.length !== pagination.total,
    handleRefresh,
    handleLoadMore,
  };
};
