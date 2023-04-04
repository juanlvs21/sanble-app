import { useSWRLists } from "@/hooks/useSWRLists";
import { getMySanbleStandListRequest } from "@/services";
import { TStand } from "@/types/TStand";

export const useMyStandsList = () => {
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    isEmpty,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useSWRLists<TStand>("/my-sanble/stands", getMySanbleStandListRequest);

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
