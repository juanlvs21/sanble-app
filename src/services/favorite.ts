import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { EUserFav, TUserFavorites } from "@/types/TUser";
import { TGetListParams } from "@/types/TRequest";
import { TResponseList } from "@/types/THttp";
import { TFair } from "@/types/TFair";
import { TStand } from "@/types/TStand";

const URL_PREFIX = "/favorites";

export const setFavoriteRequest = (
  favoriteType: EUserFav,
  favoriteID: string
) =>
  api
    .patch<AxiosResponse<TUserFavorites>>(`${URL_PREFIX}/${favoriteType}`, {
      favoriteID,
    })
    .then(({ data }) => data.data);

export const getFavoritesFairRequest = (
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

export const getFavoritesStandsRequest = (
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
