import { useSWRLists } from "@/hooks/useSWRLists";
import { getStandListRequest } from "@/services";
import { TStand } from "@/types/TStand";

export const useStandsList = () => {
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useSWRLists<TStand>("/stands", getStandListRequest);

  return {
    list,
    orderBy,
    orderDir,
    isLoading,
    handleRefresh,
    handleInfinite,
    handleShorting,
  };
};
