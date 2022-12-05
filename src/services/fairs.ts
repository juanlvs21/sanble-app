import { AxiosResponse } from "axios";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { api } from "@/services";
import { TFair } from "@/types/TFairs";
import { TPaginationParams } from "@/types/TPagination";
import { TResponseList } from "@/types/THttp";

export const getFairListInfiniteScrollFetcher = (
  currentData?: TFair[],
  params?: TPaginationParams
): Promise<TResponseList<TFair[]>> =>
  api
    .get<AxiosResponse<TResponseList<TFair[]>>>("/fairs/list", {
      params: {
        page: params?.page || 1,
        perPage: params?.perPage || 10,
      },
    })
    .then(({ data }) => ({
      ...data.data,
      list: infiteScrollData("id", data.data.list, currentData),
    }));

export const getFairBestListFetcher = (): Promise<TFair[]> =>
  api.get(`/fairs/best`).then(({ data }) => data.data);

export const getFairDetailsFetcher = (fairID: string): Promise<TFair> =>
  api.get(`/fairs/${fairID}`).then(({ data }) => data.data);

export const getFairListGeolocationFetcher = (): Promise<TFair[]> =>
  api.get(`/fairs/geolocation`).then(({ data }) => data.data);
