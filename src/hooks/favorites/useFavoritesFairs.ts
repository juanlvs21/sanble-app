import { useSWRLists } from "@/hooks/useSWRLists";
import { getFavoritesFairRequest } from "@/services";
import { TFair } from "@/types/TFair";

export const useFavoritesFairs = () => {
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    isEmpty,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useSWRLists<TFair>("/favorites/fairs", getFavoritesFairRequest);

  return {
    list,
    orderBy,
    orderDir,
    isLoading,
    isEmpty,
    handleRefresh,
    handleInfinite,
    handleShorting,
  };
};
