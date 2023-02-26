import { getFairListRequest } from "@/services";
import { TFair } from "@/types/TFair";
import { useSWRLists } from "../useSWRLists";

export const useFairsList = () => {
  const {
    list,
    orderBy,
    orderDir,
    isLoading,
    isSorting,
    handleRefresh,
    handleInfinite,
    handleShorting,
  } = useSWRLists<TFair>("/fairs", getFairListRequest);

  return {
    list,
    orderBy,
    orderDir,
    isLoading,
    isSorting,
    handleRefresh,
    handleInfinite,
    handleShorting,
  };
};
