import { AxiosResponse } from "axios";

import { api } from "@/services";
import {
  EUserFav,
  TAuthSignupForm,
  TUser,
  TUserFavorites,
} from "@/types/TUser";

export const signUpRequest = (user: TAuthSignupForm) =>
  api
    .post<AxiosResponse<TUser>>("/user/signup", user)
    .then(({ data }) => data.data);

export const getUserDataRequest = () =>
  api.get<AxiosResponse<TUser>>("/user/profile").then(({ data }) => data.data);

export const setFavoriteRequest = (
  favoriteType: EUserFav,
  favoriteID: string
) =>
  api
    .patch<AxiosResponse<TUserFavorites>>(`/user/favorite/${favoriteType}`, {
      favoriteID,
    })
    .then(({ data }) => data.data);
