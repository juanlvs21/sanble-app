import { AxiosResponse } from "axios";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { api } from "@/services";
import { TFair } from "@/types/TFairs";
import { TPaginationParams } from "@/types/TPagination";
import { TPagination } from "@/types/TRequest";

type ListResponse = {
  fairs: TFair[];
  pagination: TPagination;
};

export const getFairListFetcher = (
  currentData?: TFair[],
  params?: TPaginationParams
): Promise<ListResponse> =>
  api
    .get<AxiosResponse<ListResponse>>("/fairs", {
      params: {
        page: params?.page || 1,
        perPage: params?.perPage || 10,
      },
    })
    .then(({ data }) => ({
      ...data.data,
      fairs: infiteScrollData("id", data.data.fairs, currentData),
    }));
