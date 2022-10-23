import { api } from "@/services";
import { TFair } from "@/types/TFairs";
import { TPagination } from "@/types/TRequest";

export const getFairListFetcher = (): Promise<{
  fairs: TFair[];
  pagination: TPagination;
}> => api.get("/fairs").then(({ data }) => data.data);
