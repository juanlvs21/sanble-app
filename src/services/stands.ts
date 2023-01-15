import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { TStand } from "@/types/TStand";
import { TResponseList } from "@/types/THttp";
import { TGetListParams } from "@/types/TRequest";
import { TReview, TReviewForm } from "@/types/TReview";

const URL_PREFIX = "/stands";

export const getStandListRequest = (
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TStand[]>>>(URL_PREFIX, {
      ...config,
      params: {
        orderBy: params?.orderBy || "stars",
        orderDir: params?.orderDir || "desc",
        lastIndex: params?.lastIndex || 0,
        limit: params?.limit || 9,
      },
    })
    .then(({ data }) => data.data);

export const getStandBestListRequest = () =>
  api
    .get<AxiosResponse<TStand[]>>(`${URL_PREFIX}/best`)
    .then(({ data }) => data.data);

export const getStandDetailsRequest = (standID: string) =>
  api
    .get<AxiosResponse<TStand>>(`${URL_PREFIX}/${standID}`)
    .then(({ data }) => data.data);

export const getStandReviewsRequest = (
  standID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TReview[]> & { form?: TReview }>>(
      `${URL_PREFIX}/${standID}/reviews`,
      {
        ...config,
        params: {
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 9,
        },
      }
    )
    .then(({ data }) => data.data);

export const saveStandReviewRequest = (standID: string, data: TReviewForm) =>
  api
    .post<AxiosResponse<{ review: TReview; stansStars: number }>>(
      `${URL_PREFIX}/${standID}/reviews`,
      data
    )
    .then(({ data }) => data.data);
