import { AxiosResponse } from "axios";

import { api } from "@/services";
import {
  TAuthSignupForm,
  TChangePassword,
  TUpdateUser,
  TUser,
} from "@/types/TUser";

const URL_PREFIX = "/user";

export const signUpRequest = (user: TAuthSignupForm) =>
  api
    .post<AxiosResponse<TUser>>(`${URL_PREFIX}/signup`, user)
    .then(({ data }) => data.data);

export const getUserDataRequest = () =>
  api.get<AxiosResponse<TUser>>(`${URL_PREFIX}`).then(({ data }) => data.data);

export const updateUserRequest = (updateUser: TUpdateUser) =>
  api
    .put<AxiosResponse<TUser>>(`${URL_PREFIX}`, updateUser)
    .then(({ data }) => data.data);

export const uploadUserPhotoRequest = (formData: FormData) =>
  api
    .post<AxiosResponse<TUser>>(`${URL_PREFIX}/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);

export const changePasswordUserRequest = (passwordUser: TChangePassword) =>
  api
    .patch<AxiosResponse>("/user/change-password", passwordUser)
    .then(({ data }) => data.data);
