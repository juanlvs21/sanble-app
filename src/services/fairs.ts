import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { TFair, TFairForm, TFairGeo } from "@/types/TFair";
import { TResponseList } from "@/types/THttp";
import { TPhotographDetails } from "@/types/TPhotograph";
import { TGetListParams } from "@/types/TRequest";
import { TReview, TReviewForm } from "@/types/TReview";
import { TStand } from "@/types/TStand";
import { TPost, TPostForm } from "@/types/TPost";

const URL_PREFIX = "/fairs";

export const getFairListRequest = (
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TFair[]>>>(URL_PREFIX, {
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
  api
    .get<AxiosResponse<TFair[]>>(`${URL_PREFIX}/best`)
    .then(({ data }) => data.data);

export const getFairDetailsRequest = (fairID: string) =>
  api
    .get<AxiosResponse<TFair>>(`${URL_PREFIX}/${fairID}`)
    .then(({ data }) => data.data);

export const updateFairRequest = (values: TFairForm) =>
  api
    .patch<AxiosResponse<TFair>>(`${URL_PREFIX}/${values?.id ?? ""}`, values)
    .then(({ data }) => data.data);

export const getFairListGeolocationRequest = () =>
  api
    .get<AxiosResponse<TFairGeo[]>>(`${URL_PREFIX}/geolocation`)
    .then(({ data }) => data.data);

export const getFairStandsListRequest = (
  fairID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TStand[]>>>(
      `${URL_PREFIX}/${fairID}/stands`,
      {
        ...config,
        params: {
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 10,
        },
      }
    )
    .then(({ data }) => data.data);

export const getFairReviewsRequest = (
  fairID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TReview[]> & { form?: TReview }>>(
      `${URL_PREFIX}/${fairID}/reviews`,
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
      `${URL_PREFIX}/${fairID}/reviews`,
      data
    )
    .then(({ data }) => data.data);

export const getFairPostsRequest = (
  fairID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TPost[]>>>(
      `${URL_PREFIX}/${fairID}/posts`,
      {
        ...config,
        params: {
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 9,
        },
      }
    )
    .then(({ data }) => data.data);

export const saveFairPostRequest = (fairID: string, formData: FormData) =>
  api
    .post<AxiosResponse<{ post: TPost }>>(
      `${URL_PREFIX}/${fairID}/posts`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(({ data }) => data.data);

export const uploadFairPhotoRequest = (fairID: string, formData: FormData) =>
  api
    .post<AxiosResponse<TPhotographDetails>>(
      `${URL_PREFIX}/${fairID}/photograph`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(({ data }) => data.data);

export const updateFairPhotoRequest = (
  fairID: string,
  photoID: string,
  formData: FormData
) =>
  api
    .post<AxiosResponse<TPhotographDetails>>(
      `${URL_PREFIX}/${fairID}/photograph/${photoID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(({ data }) => data.data);

export const getFairPhotoRequest = (fairID: string, photoID: string) =>
  api
    .get<AxiosResponse<TPhotographDetails>>(
      `${URL_PREFIX}/${fairID}/photograph/${photoID}`
    )
    .then(({ data }) => data.data);

export const deleteFairPhotoRequest = (fairID: string, photoID: string) =>
  api
    .delete<AxiosResponse<{ photographID: string }>>(
      `${URL_PREFIX}/${fairID}/photograph/${photoID}`
    )
    .then(({ data }) => data.data);
