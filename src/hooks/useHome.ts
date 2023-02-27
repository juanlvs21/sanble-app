import { useEffect } from "react";
import useSWRMutation from "swr/immutable";

import { useToast } from "@/hooks/useToast";
import { getFairBestListRequest, getProductTypesRequest } from "@/services";

export const useHome = () => {
  const { toast } = useToast();

  const {
    data: dataFairs,
    error: errorFairs,
    isLoading: isLoadingFairs,
    mutate: mutateFairs,
  } = useSWRMutation("/fairs/best", getFairBestListRequest);

  const {
    data: dataStands,
    error: errorStands,
    isLoading: isLoadingStands,
    mutate: mutateStands,
  } = useSWRMutation("/stands/best", getFairBestListRequest);

  const {
    data: dataProductType,
    error: errorProductType,
    isLoading: isLoadingProductType,
    mutate: mutateProductType,
  } = useSWRMutation("/products/types", getProductTypesRequest);

  const handleLoadAllData = async () => {
    await Promise.all([mutateFairs(), mutateStands(), mutateProductType()]);
  };

  useEffect(() => {
    if (errorFairs) toast(errorFairs, { type: "error" });
  }, [errorFairs]);

  useEffect(() => {
    if (errorStands) toast(errorStands, { type: "error" });
  }, [errorStands]);

  useEffect(() => {
    if (errorProductType) toast(errorProductType, { type: "error" });
  }, [errorProductType]);

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
