import { useState } from "react";
import useSWR from "swr";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { getInvitationStandFormRequest } from "@/services/invitation";
import { TPagination } from "@/types/THttp";
import { TInvitationFormStand } from "@/types/TInvitation";

const DEFAULT_LAST_INDEX_LIST = 0;
const DEFAULT_LIMIT_LIST = 10;

export const useStandRequestFair = (fairID: string) => {
  const { toast, toastDismiss } = useToast();
  const [stands, setStands] = useState<TInvitationFormStand[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [pagination, setPagination] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_LIST,
    limit: DEFAULT_LIMIT_LIST,
    total: 0,
  });

  const SWR_KEY_INVITATION_STAND = `/stands/${fairID}`;

  const { isLoading, mutate } = useSWR(
    SWR_KEY_INVITATION_STAND,
    async () => await getInvitationStandFormRequest(fairID),
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
                    : stands
                )
              : data.list;

          setStands(newList);
          setPagination(data.pagination);
          setIsLoadingMore(false);
        }
      },
      onError(error) {
        toastDismiss(SWR_KEY_INVITATION_STAND);
        toast(error, { type: "error", toastId: SWR_KEY_INVITATION_STAND });
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
    stands,
    isLoadingMore,
    isLoading,
    handleRefresh,
    handleLoadMore,
    showLoadMoreBtn:
      pagination.total > DEFAULT_LIMIT_LIST &&
      stands.length !== pagination.total,
  };
};
