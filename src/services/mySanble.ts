import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { TFair, TFairForm } from "@/types/TFair";
import { TResponseList } from "@/types/THttp";
import { TGetListParams } from "@/types/TRequest";
import { TStand, TStandForm } from "@/types/TStand";

const URL_PREFIX = "/my-sanble";

export const getMySanbleFairListRequest = (
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TFair[]>>>(`${URL_PREFIX}/fairs`, {
      ...config,
      params: {
        orderBy: params?.orderBy || "stars",
        orderDir: params?.orderDir || "desc",
        lastIndex: params?.lastIndex || 0,
        limit: params?.limit || 9,
      },
    })
    .then(({ data }) => data.data);

export const saveFairRequest = (values: TFairForm) =>
  api
    .post<AxiosResponse<TFair>>(`${URL_PREFIX}/fairs`, values)
    .then(({ data }) => data.data);

export const updateFairRequest = (values: TFairForm) =>
  api
    .patch<AxiosResponse<TFair>>(
      `${URL_PREFIX}/fairs/${values?.id ?? ""}`,
      values
    )
    .then(({ data }) => data.data);

export const getMySanbleStandListRequest = (
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TStand[]>>>(`${URL_PREFIX}/stands`, {
      ...config,
      params: {
        orderBy: params?.orderBy || "stars",
        orderDir: params?.orderDir || "desc",
        lastIndex: params?.lastIndex || 0,
        limit: params?.limit || 9,
      },
    })
    .then(({ data }) => data.data);

export const saveStandRequest = (values: TStandForm) =>
  api
    .post<AxiosResponse<TStand>>(`${URL_PREFIX}/stands`, values)
    .then(({ data }) => data.data);

export const updateStandRequest = (values: TStandForm) =>
  api
    .patch<AxiosResponse<TStand>>(
      `${URL_PREFIX}/stands/${values?.id ?? ""}`,
      values
    )
    .then(({ data }) => data.data);
