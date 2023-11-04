import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { TResponseList } from "@/types/THttp";
import { TInvitationFormFair } from "@/types/TInvitation";
import { TGetListParams } from "@/types/TRequest";

const URL_PREFIX = "/invitations";

export const getInvitationFairsFormRequest = (
  standID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TInvitationFormFair[]>>>(
      `${URL_PREFIX}/form/fairs?standID=${standID}`,
      {
        ...config,
        params: {
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 9,
        },
      }
    )
    .then(({ data }) => data.data);
