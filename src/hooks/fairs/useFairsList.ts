import { OrderByDirection } from "firebase/firestore";
import { useEffect, useState } from "react";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { getFairListRequest } from "@/services";
import { TFair } from "@/types/TFair";
import { TGetListParams } from "@/types/TRequest";

const DEFAULT_LAST_INDEX = 0;
const DEFAULT_LIMIT = 9;
const DEFAULT_ORDER_BY = "stars";
const DEFAULT_ORDER_DIR = "desc";

export const useFairsList = () => {
  const { toast } = useToast();
  const [lastIndex, setLastIndex] = useState(DEFAULT_LAST_INDEX);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [orderBy, setOrderBy] = useState<string>(DEFAULT_ORDER_BY);
  const [orderDir, setOrderDir] = useState<OrderByDirection>(DEFAULT_ORDER_DIR);
  const [list, setList] = useState<TFair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async (params?: TGetListParams) => {
    setIsLoading(true);

    try {
      const lastIndexReq = params?.lastIndex || DEFAULT_LAST_INDEX;
      const limitReq = params?.limit || DEFAULT_LIMIT;
      const orderByReq = params?.orderBy || DEFAULT_ORDER_BY;
      const orderDirReq = params?.orderDir || DEFAULT_ORDER_DIR;

      const { list: listRes, pagination } = await getFairListRequest({
        lastIndex: lastIndexReq,
        limit: limitReq,
        orderBy: orderByReq,
        orderDir: orderDirReq,
      });
      if (pagination.lastIndex === DEFAULT_LAST_INDEX) {
        setList(infiteScrollData("id", listRes, []));
      } else setList(infiteScrollData("id", listRes, list));

      setLastIndex(pagination.lastIndex);
      setLimit(pagination.limit);
      setOrderBy(orderByReq);
      setOrderDir(orderDirReq);
    } catch (error: any) {
      toast("Error al cargar el listado de ferias", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    await handleLoad();
  };

  const handleInfinite = async () => {
    await handleLoad({ lastIndex, limit, orderBy, orderDir });
  };

  const handleShorting = async (
    orderBy: string,
    orderDir: OrderByDirection
  ) => {
    setIsSorting(true);
    await handleLoad({ orderBy, orderDir });
    setIsSorting(false);
  };

  return {
    list,
    orderBy,
    orderDir,
    isLoading,
    isSorting,
    handleLoad,
    handleRefresh,
    handleInfinite,
    handleShorting,
  };
};
