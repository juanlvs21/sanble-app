import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { TFair, TFairGeo } from "@/types/TFair";
import { TResponseList } from "@/types/THttp";
import { TGetListParams } from "@/types/TRequest";

export const getFairListRequest = (
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TFair[]>>>("/fairs", {
      ...config,
      params: {
        page: params?.page || 1,
        perPage: params?.perPage || 10,
        orderBy: params?.orderBy || "stars",
        orderDir: params?.orderDir || "desc",
      },
    })
    .then(({ data }) => data.data);

export const getFairBestListRequest = () =>
  api.get<AxiosResponse<TFair[]>>(`/fairs/best`).then(({ data }) => data.data);

export const getFairDetailsRequest = (fairID: string) =>
  api
    .get<AxiosResponse<TFair>>(`/fairs/${fairID}`)
    .then(({ data }) => data.data);

export const getFairListGeolocationRequest = () =>
  api
    .get<AxiosResponse<TFairGeo[]>>(`/fairs/geolocation`)
    .then(({ data }) => data.data);
