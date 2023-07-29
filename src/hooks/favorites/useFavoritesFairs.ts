import { useSWRLists } from "@/hooks/useSWRLists";
import { useUser } from "@/hooks/useUser";
import { getFavoritesFairRequest } from "@/services";
import { TFair } from "@/types/TFair";

export const useFavoritesFairs = () => {
  const { user } = useUser();
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
    list: list.filter(({ id }) => user?.favoriteFairs.includes(id)),
    orderBy,
    orderDir,
    isLoading,
    isEmpty,
    handleRefresh,
    handleInfinite,
    handleShorting,
  };
};
