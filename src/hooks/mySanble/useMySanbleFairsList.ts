import { getMySanbleFairListRequest } from "@/services";
import { TFair } from "@/types/TFair";
import { useSWRLists } from "@/hooks/useSWRLists";

export const useMySanbleFairsList = () => {
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useSWRLists<TFair>("/my-sanble/fairs", getMySanbleFairListRequest);

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
