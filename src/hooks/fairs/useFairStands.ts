import { useEffect, useState } from "react";
import useSWR from "swr";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { getFairStandsListRequest } from "@/services";
import { TPagination } from "@/types/THttp";
import { TStand } from "@/types/TStand";

const DEFAULT_LAST_INDEX = 0;
const DEFAULT_LIMIT = 10;

export const useFairStands = (fairID: string) => {
  const { toast, toastDismiss } = useToast();
  const [stands, setStands] = useState<TStand[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const [pagination, setPagination] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX,
    limit: DEFAULT_LIMIT,
    total: 0,
  });

  const SWR_KEY_FAIRS_STANDS = `/fairs/${fairID}/stands`;

  const { isLoading, mutate } = useSWR(
    SWR_KEY_FAIRS_STANDS,
    async () => await getFairStandsListRequest(fairID, pagination),
    {
      onSuccess(data) {
        if (data) {
          const newList =
            pagination.lastIndex != 0
              ? infiteScrollData(
                  "id",
                  data.list,
                  data.pagination.lastIndex === DEFAULT_LAST_INDEX ? [] : stands
                )
              : data.list;

          setStands(newList || []);
          setPagination(data.pagination);
          setIsLoadMore(false);
        }
      },
      onError(error) {
        toastDismiss(SWR_KEY_FAIRS_STANDS);
        toast(error, { type: "error", toastId: SWR_KEY_FAIRS_STANDS });
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
    toastDismiss(SWR_KEY_FAIRS_STANDS);
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
    stands,
    isLoading,
    isLoadMore,
    showLoadMoreBtn:
      pagination.total > DEFAULT_LIMIT && stands.length !== pagination.total,
    handleRefresh,
    handleLoadMore,
  };
};
