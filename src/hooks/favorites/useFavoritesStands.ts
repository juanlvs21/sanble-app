import { useSWRLists } from "@/hooks/useSWRLists";
import { useUser } from "@/hooks/useUser";
import { getFavoritesStandsRequest } from "@/services";
import { TStand } from "@/types/TStand";

export const useFavoritesStands = () => {
  const { user } = useUser();
  const { list, ...listProps } = useSWRLists<TStand>(
    "/favorites/stands",
    getFavoritesStandsRequest
  );

  return {
    list: list.filter(({ id }) => user?.favoriteStands.includes(id)),
    ...listProps,
  };
};
