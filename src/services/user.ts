import { AxiosResponse } from "axios";

import { api } from "@/services";
import { TAuthSignupForm, TUpdateUser, TUser } from "@/types/TUser";

export const signUpRequest = (user: TAuthSignupForm) =>
  api
    .post<AxiosResponse<TUser>>("/user/signup", user)
    .then(({ data }) => data.data);

export const getUserDataRequest = () =>
  api.get<AxiosResponse<TUser>>("/user").then(({ data }) => data.data);

export const updateUserRequest = (updateUser: TUpdateUser) =>
  api
    .put<AxiosResponse<TUser>>("/user", updateUser)
    .then(({ data }) => data.data);
