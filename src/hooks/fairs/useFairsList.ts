import { OrderByDirection } from "firebase/firestore";
import { useEffect, useState } from "react";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import { getFairListRequest } from "@/services";
import { TFair } from "@/types/TFair";
import { TGetListParams } from "@/types/TRequest";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
const DEFAULT_TOTAL_PAGE = 0;
const DEFAULT_ORDER_BY = "stars";
const DEFAULT_ORDER_DIR = "desc";

export const useFairsList = () => {
  const { toast } = useToast();
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [totalPages, setTotalPages] = useState(DEFAULT_TOTAL_PAGE);
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
      const pageReq = params?.page || DEFAULT_PAGE;
      const perPageReq = params?.perPage || DEFAULT_PER_PAGE;
      const orderByReq = params?.orderBy || DEFAULT_ORDER_BY;
      const orderDirReq = params?.orderDir || DEFAULT_ORDER_DIR;

      const { list: listRes, pagination } = await getFairListRequest({
        page: pageReq,
        perPage: perPageReq,
        orderBy: orderByReq,
        orderDir: orderDirReq,
      });
      if (pagination.page === DEFAULT_PAGE) {
        setList(infiteScrollData("id", listRes, []));
      } else setList(infiteScrollData("id", listRes, list));

      setPage(pagination.page);
      setPerPage(pagination.perPage);
      setTotalPages(pagination.totalPages);
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
    const nextPage = page + 1;
    const currentPage = totalPages;

    if (nextPage <= currentPage) {
      await handleLoad({ page: nextPage, perPage, orderBy, orderDir });
    }
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
