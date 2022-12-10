import { useQuery } from "@tanstack/react-query";

import { getFairBestListFetcher, getProductTypesFetcher } from "@/services";
import { TFair } from "@/types/TFair";
import { TProductType } from "@/types/TProduct";

export const useHome = () => {
  const {
    data: fairsBestData,
    refetch: refetchFairsBest,
    isFetching: isLoadingFairsBest,
  } = useQuery<TFair[]>(["home-fairs-best"], getFairBestListFetcher, {
    enabled: false,
  });

  const {
    data: standsBestData,
    refetch: refetchStandsBest,
    isFetching: isLoadingStandsBest,
  } = useQuery<TFair[]>(["home-stands-best"], getFairBestListFetcher, {
    enabled: false,
  });

  const {
    data: productTypesData,
    refetch: refetchProductTypes,
    isFetching: isLoadingProductTypes,
  } = useQuery<TProductType[]>(["home-product-types"], getProductTypesFetcher, {
    enabled: false,
  });

  return {
    isLoadingFairsBest,
    isLoadingStandsBest,
    isLoadingProductTypes,
    fairsBest: fairsBestData,
    standsBest: standsBestData,
    productTypes: productTypesData,
    handleLoadFairsBest: refetchFairsBest,
    handleLoadStandsBest: refetchStandsBest,
    handleLoadProductTypes: refetchProductTypes,
  };
};
