import { AxiosResponse } from "axios";

import { api } from "@/services";
import { TNotificationToken } from "@/types/TNotification";

const URL_PREFIX = "/notification";

export const saveNotificationTokenRequest = (data: TNotificationToken) =>
  api
    .post<AxiosResponse>(`${URL_PREFIX}/token`, data)
    .then(({ data }) => data.data);
