import useSWR from "swr";

import { useToast } from "@/hooks/useToast";
import {
  getFairBestListRequest,
  getProductsRecentRequest,
  getStandBestListRequest,
} from "@/services";

const SWR_KEY_FAIRS_BEST = "/fairs/best";
const SWR_KEY_STANDS_BEST = "/stands/best";
const SWR_KEY_PRODUCTS_RECENT = "/products/recent";

export const useHome = () => {
  const { toast, toastDismiss } = useToast();

  const {
    data: dataFairs,
    isLoading: isLoadingFairsBest,
    mutate: mutateFairs,
  } = useSWR(SWR_KEY_FAIRS_BEST, getFairBestListRequest, {
    onError(error) {
      toastDismiss(SWR_KEY_FAIRS_BEST);
      toast(error, { type: "error", toastId: SWR_KEY_FAIRS_BEST });
    },
  });

  const {
    data: dataStands,
    isLoading: isLoadingStandsBest,
    mutate: mutateStands,
  } = useSWR(SWR_KEY_STANDS_BEST, getStandBestListRequest, {
    onError(error) {
      toastDismiss(SWR_KEY_STANDS_BEST);
      toast(error, { type: "error", toastId: SWR_KEY_STANDS_BEST });
    },
  });

  const {
    data: dataProductRecent,
    isLoading: isLoadingProductsRecent,
    mutate: mutateProductsRecent,
  } = useSWR(SWR_KEY_PRODUCTS_RECENT, getProductsRecentRequest, {
    onError(error) {
      toastDismiss(SWR_KEY_PRODUCTS_RECENT);
      toast(error, { type: "error", toastId: SWR_KEY_PRODUCTS_RECENT });
    },
  });

  const handleLoadAllData = async () => {
    await Promise.all([mutateFairs(), mutateStands(), mutateProductsRecent()]);
  };

  return {
    isLoadingFairsBest,
    isLoadingStandsBest,
    isLoadingProductsRecent,
    fairsBest: dataFairs,
    standsBest: dataStands,
    productRecent: dataProductRecent,
    handleLoadAllData,
  };
};
