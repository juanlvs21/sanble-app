import { api } from "@/services/api";
import { TFair } from "@/types/TFairs";

export const getFairsUpcomingRequest = (): Promise<TFair[]> => {
  return api.get("/fairs/upcoming").then(({ data }) => data.data);
};
