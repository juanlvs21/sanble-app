import { AxiosResponse } from "axios";

import { api } from "@/services";
import { TAuthSignupForm, TUser } from "@/types/TUser";

export const signUpRequest = (user: TAuthSignupForm) =>
  api
    .post<AxiosResponse<TUser>>("/user/signup", user)
    .then(({ data }) => data.data);

export const getUserDataRequest = () =>
  api.get<AxiosResponse<TUser>>("/user/profile").then(({ data }) => data.data);
