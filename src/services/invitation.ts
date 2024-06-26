import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/services";
import { TResponseList } from "@/types/THttp";
import {
  TInvitation,
  TInvitationForm,
  TInvitationFormFair,
  TInvitationFormStand,
} from "@/types/TInvitation";
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

export const getInvitationStandFormRequest = (
  fairID: string,
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TInvitationFormStand[]>>>(
      `${URL_PREFIX}/form/stands?fairID=${fairID}`,
      {
        ...config,
        params: {
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 9,
        },
      }
    )
    .then(({ data }) => data.data);

export const sendInvitationRequest = (data: TInvitationForm) =>
  api
    .post<AxiosResponse<TInvitationFormStand | TInvitationFormFair>>(
      `${URL_PREFIX}`,
      data
    )
    .then(({ data }) => data.data);

export const getInvitationsReceivedRequest = (
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TInvitation[]>>>(
      `${URL_PREFIX}/received`,
      {
        ...config,
        params: {
          lastIndex: params?.lastIndex || 0,
          limit: params?.limit || 9,
        },
      }
    )
    .then(({ data }) => data.data);

export const getInvitationsSentRequest = (
  params?: TGetListParams,
  config?: AxiosRequestConfig
) =>
  api
    .get<AxiosResponse<TResponseList<TInvitation[]>>>(`${URL_PREFIX}/sent`, {
      ...config,
      params: {
        lastIndex: params?.lastIndex || 0,
        limit: params?.limit || 9,
      },
    })
    .then(({ data }) => data.data);

export const unsendInvitationRequest = (invitationId: string) =>
  api
    .delete<AxiosResponse<TResponseList<TInvitation[]>>>(
      `${URL_PREFIX}/${invitationId}/unsend`
    )
    .then(({ data }) => data.data);

export const declineInvitationRequest = (invitationId: string) =>
  api
    .delete<AxiosResponse<TResponseList<TInvitation[]>>>(
      `${URL_PREFIX}/${invitationId}/decline`
    )
    .then(({ data }) => data.data);
