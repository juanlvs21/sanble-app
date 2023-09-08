import { useSWRLists } from "@/hooks/useSWRLists";
import { getFairListRequest } from "@/services";
import { TFair } from "@/types/TFair";

export const useFairsList = () => {
  const listProps = useSWRLists<TFair>("/fairs", getFairListRequest);

  return listProps;
};
