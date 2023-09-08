import { useSWRLists } from "@/hooks/useSWRLists";
import { getStandListRequest } from "@/services";
import { TStand } from "@/types/TStand";

export const useStandsList = () => {
  const listProps = useSWRLists<TStand>("/stands", getStandListRequest);

  return listProps;
};
