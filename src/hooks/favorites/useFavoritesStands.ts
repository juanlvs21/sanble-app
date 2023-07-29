import { useSWRLists } from "@/hooks/useSWRLists";
import { getFavoritesStandsRequest } from "@/services";
import { TStand } from "@/types/TStand";

export const useFavoritesStands = () => {
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    isEmpty,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useSWRLists<TStand>("/favorites/stands", getFavoritesStandsRequest);

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
