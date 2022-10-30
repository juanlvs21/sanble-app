import { api } from "@/services";
import {
  EUserFav,
  TAuthSignupForm,
  TUser,
  TUserFavorites,
} from "@/types/TUser";

export const signUpRequest = (user: TAuthSignupForm): Promise<TUser> =>
  api.post("/user/signup", user).then(({ data }) => data.data);

export const getUserDataFetcher = (): Promise<TUser> =>
  api.get("/user/profile").then(({ data }) => data.data);

export const setFavoriteRequest = (
  favoriteType: EUserFav,
  favoriteID: string
): Promise<TUserFavorites> =>
  api
    .patch(`/user/favorite/${favoriteType}`, { favoriteID })
    .then(({ data }) => data.data);
