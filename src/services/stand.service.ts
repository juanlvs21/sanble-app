import { api } from "@/services/api";
import { TStand } from "@/types/TStands";

export const getStandsBestRequest = (): Promise<TStand[]> => {
  return api.get("/stands/best").then(({ data }) => data.data);
};
