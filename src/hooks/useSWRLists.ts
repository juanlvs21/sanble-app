import { OrderByDirection } from "firebase/firestore";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/immutable";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { TGetListParams } from "@/types/TRequest";
import { TOrder, TPagination } from "@/types/THttp";

const DEFAULT_LAST_INDEX = 0;
const DEFAULT_LIMIT = 9;
const DEFAULT_ORDER_BY = "stars";
const DEFAULT_ORDER_DIR = "desc";

type TDefaultParams = Partial<TOrder & TPagination>;

export const useSWRLists = <T = any>(
  SWRKey: string,
  fetcher: (params: TGetListParams) => Promise<any>,
  defaultParams?: TDefaultParams
) => {
  const paramsDefault: Required<TDefaultParams> = {
    lastIndex: defaultParams?.lastIndex ?? DEFAULT_LAST_INDEX,
    limit: defaultParams?.limit ?? DEFAULT_LIMIT,
    orderBy: defaultParams?.orderBy ?? DEFAULT_ORDER_BY,
    orderDir: defaultParams?.orderDir ?? DEFAULT_ORDER_DIR,
  };

  const { toast } = useToast();
  const [list, setList] = useState<T[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [order, setOrder] = useState<TOrder>({
    orderBy: paramsDefault.orderBy,
    orderDir: paramsDefault.orderDir,
  });
  const [pagination, setPagination] = useState<TPagination>({
    lastIndex: paramsDefault.lastIndex,
    limit: paramsDefault.limit,
  });

  const { data, error, isLoading, mutate } = useSWRMutation<any>(
    SWRKey,
    async () =>
      await fetcher({
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
        await fetcher({
          ...mutatePagination,
          ...mutateOrder,
        })
    );

    if (dataMutate) {
      const newList = infinite
        ? infiteScrollData(
            "id",
            dataMutate.list,
            dataMutate.pagination.lastIndex === paramsDefault.lastIndex
              ? []
              : list
          )
        : dataMutate.list;

      setList(newList);
      setPagination(dataMutate.pagination);
      if (dataMutate.order) setOrder(dataMutate.order);
    }
  };

  const handleRefresh = async () => {
    await handleMutate(
      {
        lastIndex: paramsDefault.lastIndex,
        limit: paramsDefault.limit,
      },
      order
    );
  };

  const handleInfinite = async () => {
    await handleMutate(pagination, order, true);
  };

  const handleShorting = async (
    orderBy: string,
    orderDir: OrderByDirection
  ) => {
    setIsSorting(true);
    await handleMutate(
      {
        lastIndex: paramsDefault.lastIndex,
        limit: paramsDefault.limit,
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
  }, [data]);

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
      });
    }
  }, [error]);

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
