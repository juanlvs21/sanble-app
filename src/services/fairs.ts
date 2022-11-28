import { AxiosResponse } from "axios";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { api } from "@/services";
import { FairsListResponse, TFair } from "@/types/TFairs";
import { TPaginationParams } from "@/types/TPagination";

export const getFairListInfiniteScrollFetcher = (
  currentData?: TFair[],
  params?: TPaginationParams
): Promise<FairsListResponse> =>
  api
    .get<AxiosResponse<FairsListResponse>>("/fairs/list", {
      params: {
        page: params?.page || 1,
        perPage: params?.perPage || 10,
      },
    })
    .then(({ data }) => ({
      ...data.data,
      fairs: infiteScrollData("id", data.data.fairs, currentData),
    }));
// TODO: I must create a similar fetcher but without joining the data, with a normal pagination

export const getFairDetailsFetcher = (fairID: string): Promise<TFair> =>
  api.get(`/fairs/${fairID}`).then(({ data }) => data.data);

export const getFairListGeolocationFetcher = (): Promise<TFair[]> =>
  api.get(`/fairs/geolocation`).then(({ data }) => data.data);
