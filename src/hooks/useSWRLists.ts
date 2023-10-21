import { OrderByDirection } from "firebase/firestore";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { TGetListParams } from "@/types/TRequest";
import { TOrder, TPagination } from "@/types/THttp";
import { EVERY_THIRTY_SECONDS_IN_MILLISECONDS } from "@/helpers/constants";

const DEFAULT_LAST_INDEX = 0;
const DEFAULT_LIMIT = 30;
const DEFAULT_ORDER_BY = "stars";
const DEFAULT_ORDER_DIR = "desc";

type TDefaultParams = Partial<TOrder & TPagination>;

export const useSWRLists = <T = any>(
  SWRKey: string,
  fetcher: (params: TGetListParams) => Promise<any>,
  defaultParams?: TDefaultParams
) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const paramsDefault: Required<TDefaultParams> = {
    lastIndex: defaultParams?.lastIndex ?? DEFAULT_LAST_INDEX,
    limit: defaultParams?.limit ?? DEFAULT_LIMIT,
    orderBy: defaultParams?.orderBy ?? DEFAULT_ORDER_BY,
    orderDir: defaultParams?.orderDir ?? DEFAULT_ORDER_DIR,
    total: 0,
  };

  const { toast, toastDismiss } = useToast();
  const [list, setList] = useState<T[]>([]);
  const [order, setOrder] = useState<TOrder>({
    orderBy: paramsDefault.orderBy,
    orderDir: paramsDefault.orderDir,
  });
  const [pagination, setPagination] = useState<TPagination>({
    lastIndex: paramsDefault.lastIndex,
    limit: paramsDefault.limit,
    total: 0,
  });
  const [isEmpty, setIsEmpty] = useState(false);

  const { isLoading, isValidating, mutate } = useSWRImmutable<any>(
    SWRKey,
    async () =>
      await fetcher({
        ...pagination,
        ...order,
      }),
    {
      refreshInterval: EVERY_THIRTY_SECONDS_IN_MILLISECONDS,
      onSuccess(data) {
        setIsInitializing(false);
        if (data) {
          const newList: T[] =
            pagination.lastIndex != 0
              ? infiteScrollData(
                  "id",
                  data.list,
                  data.pagination.lastIndex === paramsDefault.lastIndex
                    ? []
                    : list
                )
              : data.list;

          setIsEmpty(!newList.length);
          setList(newList);
          setPagination(data.pagination);
          setIsLoadMore(false);
        }
      },
      onError: (error) => {
        setIsInitializing(false);
        toast(error, {
          type: "error",
          toastId: SWRKey,
        });
      },
    }
  );

  const handleRefresh = async () => {
    setPagination({
      lastIndex: paramsDefault.lastIndex,
      limit: paramsDefault.limit,
      total: 0,
    });
    setOrder({
      orderBy: paramsDefault.orderBy,
      orderDir: paramsDefault.orderDir,
    });
  };

  const handleLoadMore = async () => {
    toastDismiss(SWRKey);
    setIsLoadMore(true);
    mutate();
  };

  const handleShorting = async (
    orderBy: string,
    orderDir: OrderByDirection
  ) => {
    setPagination({
      lastIndex: paramsDefault.lastIndex,
      limit: paramsDefault.limit,
      total: 0,
    });
    setOrder({ orderBy, orderDir });
  };

  useEffect(() => {
    toastDismiss(SWRKey);
    mutate();
  }, [order]);

  return {
    list,
    pagination,
    orderBy: order.orderBy,
    orderDir: order.orderDir,
    isLoading: isLoading || isInitializing,
    isValidating,
    isEmpty,
    isLoadMore,
    showLoadMoreBtn:
      pagination.total > DEFAULT_LIMIT && list.length !== pagination.total,
    handleRefresh,
    handleShorting,
    handleLoadMore,
  };
};
