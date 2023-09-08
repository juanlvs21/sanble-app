import { getMySanbleFairListRequest } from "@/services";
import { TFair } from "@/types/TFair";
import { useSWRLists } from "@/hooks/useSWRLists";

export const useMyFairsList = () => {
  const listProps = useSWRLists<TFair>(
    "/my-sanble/fairs",
    getMySanbleFairListRequest
  );

  return listProps;
};
