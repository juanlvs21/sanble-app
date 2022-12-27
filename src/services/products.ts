import { AxiosResponse } from "axios";

import { api } from "@/services";
import { TProductType } from "@/types/TProduct";

export const getProductTypesRequest = () =>
  api
    .get<AxiosResponse<TProductType[]>>(`/products/types`)
    .then(({ data }) => data.data);
