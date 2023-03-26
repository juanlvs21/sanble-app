import { OrderByDirection } from "firebase/firestore";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { TGetListParams } from "@/types/TRequest";
import { TOrder, TPagination } from "@/types/THttp";

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
  const paramsDefault: Required<TDefaultParams> = {
    lastIndex: defaultParams?.lastIndex ?? DEFAULT_LAST_INDEX,
    limit: defaultParams?.limit ?? DEFAULT_LIMIT,
    orderBy: defaultParams?.orderBy ?? DEFAULT_ORDER_BY,
    orderDir: defaultParams?.orderDir ?? DEFAULT_ORDER_DIR,
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
  });

  const { isLoading, mutate } = useSWRImmutable<any>(
    SWRKey,
    async () =>
      await fetcher({
        ...pagination,
        ...order,
      }),
    {
      onSuccess(data) {
        if (data) {
          const newList =
            pagination.lastIndex != 0
              ? infiteScrollData(
                  "id",
                  data.list,
                  data.pagination.lastIndex === paramsDefault.lastIndex
                    ? []
                    : list
                )
              : data.list;

          setList(newList);
          setPagination(data.pagination);
        }
      },
      onError: (error) => {
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
    });
    setOrder({
      orderBy: paramsDefault.orderBy,
      orderDir: paramsDefault.orderDir,
    });
  };

  const handleInfinite = async () => {
    toastDismiss(SWRKey);
    mutate();
  };

  const handleShorting = async (
    orderBy: string,
    orderDir: OrderByDirection
  ) => {
    setPagination({
      lastIndex: paramsDefault.lastIndex,
      limit: paramsDefault.limit,
    });
    setOrder({ orderBy, orderDir });
  };

  useEffect(() => {
    toastDismiss(SWRKey);
    mutate();
  }, [order]);

  return {
    list,
    orderBy: order.orderBy,
    orderDir: order.orderDir,
    isLoading,
    handleRefresh,
    handleInfinite,
    handleShorting,
  };
};
