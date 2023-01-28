import { useEffect, useState } from "react";

import { useToast } from "@/hooks/useToast";
import { TStand } from "@/types/TStand";
import { TGetListParams } from "@/types/TRequest";
import { getFairStandsListRequest } from "@/services";
import { infiteScrollData } from "@/helpers/infiniteScrollData";

const DEFAULT_LAST_INDEX = 0;
const DEFAULT_LIMIT = 10;

export const useFairDetailsStands = (fairID: string) => {
  const { toast } = useToast();
  const [stands, setStands] = useState<TStand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastIndex, setLastIndex] = useState(DEFAULT_LAST_INDEX);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async (params?: TGetListParams) => {
    setIsLoading(true);

    try {
      const lastIndexReq = params?.lastIndex || DEFAULT_LAST_INDEX;
      const limitReq = params?.limit || DEFAULT_LIMIT;

      const { list, pagination } = await getFairStandsListRequest(fairID, {
        lastIndex: lastIndexReq,
        limit: limitReq,
      });

      const newList = infiteScrollData(
        "id",
        list,
        lastIndexReq === DEFAULT_LAST_INDEX ? [] : stands
      );

      setStands(newList);
      setLastIndex(pagination.lastIndex);
      setLimit(pagination.limit);
    } catch (error: any) {
      toast("Error al cargar el listado de stands de esta feria", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInfinite = async () => {
    await handleLoad({
      lastIndex: lastIndex,
      limit: limit,
    });
  };

  return {
    isLoading,
    stands,
    handleLoad,
    handleInfinite,
  };
};
