import { useSWRLists } from "@/hooks/useSWRLists";
import { getFairListRequest } from "@/services";
import { TFair } from "@/types/TFair";

export const useFairsList = () => {
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useSWRLists<TFair>("/fairs", getFairListRequest);

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
