import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { TFair, TFairGeo } from "@/types/TFair";
import { TResponseList } from "@/types/THttp";
import { TGetListParams } from "@/types/TRequest";
import { TReview, TReviewForm } from "@/types/TReview";

export const getFairListRequest = (
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TFair[]>>>("/fairs", {
      ...config,
      params: {
        orderBy: params?.orderBy || "stars",
        orderDir: params?.orderDir || "desc",
        lastIndex: params?.lastIndex || 0,
        limit: params?.limit || 9,
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

export const getFairReviewsRequest = (
  fairID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TReview[]> & { form?: TReview }>>(
      `/fairs/${fairID}/reviews`,
      {
        ...config,
        params: {
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 9,
        },
      }
    )
    .then(({ data }) => data.data);

export const saveFairReviewRequest = (fairID: string, data: TReviewForm) =>
  api
    .post<AxiosResponse<{ review: TReview; fairStars: number }>>(
      `/fairs/${fairID}/reviews`,
      data
    )
    .then(({ data }) => data.data);
