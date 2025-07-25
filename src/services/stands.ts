import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { TStand } from "@/types/TStand";
import { TResponseList } from "@/types/THttp";
import { TGetListParams } from "@/types/TRequest";
import { TReview, TReviewForm } from "@/types/TReview";
import { TPhotographDetails } from "@/types/TPhotograph";
import { TPost } from "@/types/TPost";
import { TProduct } from "@/types/TProduct";
import { TFair } from "@/types/TFair";

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

export const getStandFairsListRequest = (
  standID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TFair[]>>>(
      `${URL_PREFIX}/${standID}/fairs`,
      {
        ...config,
        params: {
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 10,
        },
      }
    )
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
          orderBy: params?.orderBy || "stars",
          orderDir: params?.orderDir || "desc",
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 9,
        },
      }
    )
    .then(({ data }) => data.data);

export const getStandPostsRequest = (
  standID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TPost[]>>>(
      `${URL_PREFIX}/${standID}/posts`,
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
    .post<AxiosResponse<{ review: TReview; standStars: number }>>(
      `${URL_PREFIX}/${standID}/reviews`,
      data
    )
    .then(({ data }) => data.data);

export const deleteStandReviewRequest = (standID: string) =>
  api
    .delete<AxiosResponse>(`${URL_PREFIX}/${standID}/reviews`)
    .then(({ data }) => data.data);

export const saveStandPostRequest = (standID: string, formData: FormData) =>
  api
    .post<AxiosResponse<{ post: TPost }>>(
      `${URL_PREFIX}/${standID}/posts`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(({ data }) => data.data);

export const updateStandPostRequest = (
  standID: string,
  postID: string,
  formData: FormData
) =>
  api
    .put<AxiosResponse<{ post: TPost }>>(
      `${URL_PREFIX}/${standID}/posts/${postID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(({ data }) => data.data);

export const deleteStandPostRequest = (standID: string, postID: string) =>
  api
    .delete<AxiosResponse>(`${URL_PREFIX}/${standID}/posts/${postID}`)
    .then(({ data }) => data.data);

export const uploadStandPhotoRequest = (standID: string, formData: FormData) =>
  api
    .post<AxiosResponse<TPhotographDetails>>(
      `${URL_PREFIX}/${standID}/photograph`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(({ data }) => data.data);

export const updateStandPhotoRequest = (
  standID: string,
  photoID: string,
  formData: FormData
) =>
  api
    .post<AxiosResponse<TPhotographDetails>>(
      `${URL_PREFIX}/${standID}/photograph/${photoID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(({ data }) => data.data);

export const deleteStandPhotoRequest = (standID: string, photoID: string) =>
  api
    .delete<AxiosResponse<{ photographID: string }>>(
      `${URL_PREFIX}/${standID}/photograph/${photoID}`
    )
    .then(({ data }) => data.data);

export const saveStandProductRequest = (standID: string, formData: FormData) =>
  api
    .post<AxiosResponse<{ product: TProduct }>>(
      `${URL_PREFIX}/${standID}/products`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(({ data }) => data.data);

export const getStandProductsRequest = (
  standID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TProduct[]>>>(
      `${URL_PREFIX}/${standID}/products`,
      {
        ...config,
        params: {
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 9,
        },
      }
    )
    .then(({ data }) => data.data);

export const updateStandProductRequest = (
  standID: string,
  postID: string,
  formData: FormData
) =>
  api
    .put<AxiosResponse<{ post: TProduct }>>(
      `${URL_PREFIX}/${standID}/products/${postID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(({ data }) => data.data);

export const deleteStandProductRequest = (standID: string, productID: string) =>
  api
    .delete<AxiosResponse>(`${URL_PREFIX}/${standID}/products/${productID}`)
    .then(({ data }) => data.data);

export const deleteStandFairRequest = (standID: string, fairID: string) =>
  api
    .delete<AxiosResponse>(`${URL_PREFIX}/${standID}/fairs/${fairID}`)
    .then(({ data }) => data.data);
