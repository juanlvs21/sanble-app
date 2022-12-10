import { api } from "@/services";
import { TProductType } from "@/types/TProduct";

export const getProductTypesFetcher = (): Promise<TProductType[]> =>
  api.get(`/products/types`).then(({ data }) => data.data);
