import useSWR from "swr";
import { useState } from "react";

import { getInvitationFairsFormRequest } from "@/services/invitation";
import { useToast } from "@/hooks/useToast";
import { TPagination } from "@/types/THttp";
import { TInvitationFormFair } from "@/types/TInvitation";
import { infiteScrollData } from "@/helpers/infiniteScrollData";

const DEFAULT_LAST_INDEX_LIST = 0;
const DEFAULT_LIMIT_LIST = 10;

export const useFairInviteStand = (standID: string) => {
  const { toast, toastDismiss } = useToast();
  const [fairs, setFairs] = useState<TInvitationFormFair[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [pagination, setPagination] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_LIST,
    limit: DEFAULT_LIMIT_LIST,
    total: 0,
  });

  const SWR_KEY_FAIRS_DETAILS = `/fairs/${standID}`;

  const { isLoading, mutate } = useSWR(
    SWR_KEY_FAIRS_DETAILS,
    async () => await getInvitationFairsFormRequest(standID),
    {
      onSuccess(data) {
        if (data) {
          const newList =
            pagination.lastIndex != 0
              ? infiteScrollData(
                  "id",
                  data.list,
                  data.pagination.lastIndex === DEFAULT_LAST_INDEX_LIST
                    ? []
                    : fairs
                )
              : data.list;

          setFairs(newList);
          setPagination(data.pagination);
          setIsLoadingMore(false);
        }
      },
      onError(error) {
        toastDismiss(SWR_KEY_FAIRS_DETAILS);
        toast(error, { type: "error", toastId: SWR_KEY_FAIRS_DETAILS });
      },
    }
  );

  const handleRefresh = async () => {
    setPagination({
      lastIndex: DEFAULT_LAST_INDEX_LIST,
      limit: DEFAULT_LIMIT_LIST,
      total: 0,
    });

    mutate();
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    mutate();
  };

  return {
    fairs,
    isLoadingMore,
    isLoading,
    handleRefresh,
    handleLoadMore,
    showLoadMoreBtn:
      pagination.total > DEFAULT_LIMIT_LIST &&
      fairs.length !== pagination.total,
  };
};
