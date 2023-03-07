import { useEffect, useState } from "react";
import useSWRMutation from "swr/immutable";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { getFairStandsListRequest } from "@/services";
import { TPagination } from "@/types/THttp";
import { TStand } from "@/types/TStand";

const DEFAULT_LAST_INDEX = 0;
const DEFAULT_LIMIT = 10;

export const useFairStands = (fairID: string) => {
  const { toast } = useToast();
  const [stands, setStands] = useState<TStand[]>([]);

  const [pagination, setPagination] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX,
    limit: DEFAULT_LIMIT,
  });

  const { data, error, isLoading, mutate } = useSWRMutation(
    ["/fairs", fairID, "stands"],
    async () => await getFairStandsListRequest(fairID, pagination)
  );

  const handleMutate = async (
    mutatePagination: TPagination,
    infinite = false
  ) => {
    setPagination(mutatePagination);

    const dataMutate = await mutate(
      async () => await getFairStandsListRequest(fairID, mutatePagination)
    );

    if (dataMutate) {
      const newList = infinite
        ? infiteScrollData(
            "id",
            dataMutate.list,
            dataMutate.pagination.lastIndex === DEFAULT_LAST_INDEX
              ? []
              : data?.list
          )
        : data?.list;

      setStands(newList || []);
      setPagination(dataMutate.pagination);
    }
  };

  const handleRefresh = async () => {
    await handleMutate({
      lastIndex: DEFAULT_LAST_INDEX,
      limit: DEFAULT_LIMIT,
    });
  };

  const handleInfinite = async () => {
    await handleMutate(pagination, true);
  };

  useEffect(() => {
    if (!stands.length && data && !error) {
      setStands(data.list);
      setPagination(data.pagination);
    }
  }, [data]);

  useEffect(() => {
    if (error) toast(error, { type: "error" });
  }, [error]);

  return {
    stands: data?.list || [],
    isLoading,
    handleMutate,
    handleRefresh,
    handleInfinite,
  };
};
