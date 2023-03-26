import { useEffect } from "react";
import useSWRMutation from "swr/immutable";

import { useToast } from "@/hooks/useToast";
import { getFairBestListRequest, getProductTypesRequest } from "@/services";

const SWR_KEY_FAIRS_BEST = "/fairs/best";
const SWR_KEY_STANDS_BEST = "/stands/best";
const SWR_KEY_PRODUCTS_TYPES = "/products/types";

export const useHome = () => {
  const { toast, toastDismiss } = useToast();

  const {
    data: dataFairs,
    isLoading: isLoadingFairs,
    mutate: mutateFairs,
  } = useSWRMutation(SWR_KEY_FAIRS_BEST, getFairBestListRequest, {
    onError(error) {
      toastDismiss(SWR_KEY_FAIRS_BEST);
      toast(error, { type: "error", toastId: SWR_KEY_FAIRS_BEST });
    },
  });

  const {
    data: dataStands,
    isLoading: isLoadingStands,
    mutate: mutateStands,
  } = useSWRMutation(SWR_KEY_STANDS_BEST, getFairBestListRequest, {
    onError(error) {
      toastDismiss(SWR_KEY_STANDS_BEST);
      toast(error, { type: "error", toastId: SWR_KEY_STANDS_BEST });
    },
  });

  const {
    data: dataProductType,
    isLoading: isLoadingProductType,
    mutate: mutateProductType,
  } = useSWRMutation(SWR_KEY_PRODUCTS_TYPES, getProductTypesRequest, {
    onError(error) {
      toastDismiss(SWR_KEY_PRODUCTS_TYPES);
      toast(error, { type: "error", toastId: SWR_KEY_PRODUCTS_TYPES });
    },
  });

  const handleLoadAllData = async () => {
    await Promise.all([mutateFairs(), mutateStands(), mutateProductType()]);
  };

  return {
    isLoadingFairsBest: isLoadingFairs,
    isLoadingStandsBest: isLoadingStands,
    isLoadingProductTypes: isLoadingProductType,
    fairsBest: dataFairs,
    standsBest: dataStands,
    productTypes: dataProductType,
    handleLoadAllData,
  };
};
