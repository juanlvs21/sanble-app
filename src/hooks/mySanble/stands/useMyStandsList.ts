import { useSWRLists } from "@/hooks/useSWRLists";
import { getMySanbleStandListRequest } from "@/services";
import { TStand } from "@/types/TStand";

export const useMyStandsList = () => {
  const listProps = useSWRLists<TStand>(
    "/my-sanble/stands",
    getMySanbleStandListRequest
  );

  return listProps;
};
