import { OrderByDirection } from "firebase/firestore";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/immutable";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { getFairListRequest } from "@/services";
import { TFair } from "@/types/TFair";
import { TOrder, TPagination } from "@/types/THttp";

const DEFAULT_LAST_INDEX = 0;
const DEFAULT_LIMIT = 9;
const DEFAULT_ORDER_BY = "stars";
const DEFAULT_ORDER_DIR = "desc";

export const useFairsList = () => {
  const { toast } = useToast();
  const [list, setList] = useState<TFair[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [order, setOrder] = useState<TOrder>({
    orderBy: DEFAULT_ORDER_BY,
    orderDir: DEFAULT_ORDER_DIR,
  });
  const [pagination, setPagination] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX,
    limit: DEFAULT_LIMIT,
    total: 0,
  });

  const { data, error, isLoading, mutate } = useSWRMutation(
    "/fairs",
    async () =>
      await getFairListRequest({
        lastIndex: pagination.lastIndex,
        limit: pagination.limit,
        orderBy: order.orderBy,
        orderDir: order.orderDir,
      })
  );

  const handleMutate = async (
    mutatePagination: TPagination,
    mutateOrder: TOrder,
    infinite = false
  ) => {
    setPagination(mutatePagination);
    setOrder(mutateOrder);

    const dataMutate = await mutate(
      async () =>
        await getFairListRequest({
          ...mutatePagination,
          ...mutateOrder,
        })
    );

    if (dataMutate) {
      const newList = infinite
        ? infiteScrollData(
            "id",
            dataMutate.list,
            dataMutate.pagination.lastIndex === DEFAULT_LAST_INDEX ? [] : list
          )
        : dataMutate.list;

      setList(newList);
      setPagination(dataMutate.pagination);
      if (dataMutate.order) setOrder(dataMutate.order);
    }
  };

  const handleRefresh = () => {
    handleMutate(
      {
        lastIndex: DEFAULT_LAST_INDEX,
        limit: DEFAULT_LIMIT,
        total: 0,
      },
      order
    );
  };

  const handleInfinite = () => {
    handleMutate(pagination, order, true);
  };

  const handleShorting = async (
    orderBy: string,
    orderDir: OrderByDirection
  ) => {
    setIsSorting(true);
    await handleMutate(
      {
        lastIndex: DEFAULT_LAST_INDEX,
        limit: DEFAULT_LIMIT,
        total: 0,
      },
      { orderBy, orderDir }
    );
    setIsSorting(false);
  };

  useEffect(() => {
    if (!list.length && data && !error) {
      setList(data.list);
      setPagination(data.pagination);
      if (data.order) setOrder(data.order);
    }

    if (error) {
      toast("Error al cargar el listado de stands", {
        type: "error",
      });
    }
  }, [data, error]);

  return {
    list,
    orderBy: order.orderBy,
    orderDir: order.orderDir,
    isLoading,
    isSorting,
    handleRefresh,
    handleInfinite,
    handleShorting,
  };
};
