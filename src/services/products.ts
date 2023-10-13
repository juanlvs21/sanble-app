import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { TProduct, TProductType } from "@/types/TProduct";
import { TGetListParams } from "@/types/TRequest";
import { TResponseList } from "@/types/THttp";

const URL_PREFIX = "/products";

export const getProductTypesRequest = () =>
  api
    .get<AxiosResponse<TProductType[]>>(`${URL_PREFIX}/types`)
    .then(({ data }) => data.data);

export const getProductsListRequest = (
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TProduct[]>>>(`${URL_PREFIX}`, {
      ...config,
      params: {
        orderBy: params?.orderBy || "creationTime",
        orderDir: params?.orderDir || "desc",
        lastIndex: params?.lastIndex || 0,
        limit: params?.limit || 9,
      },
    })
    .then(({ data }) => data.data);
