import axios from "axios";

import { API_URL } from "@/helpers/env";
import { TUserSignup } from "@/types/TUser";
import { TAxiosResp } from "@/types/TAxios";

export const api = axios.create({
  baseURL: API_URL || "https://sanble-api.vercel.app",
  headers: { "Content-Type": "application/json", crossDomain: "true" },
});

export const signupRequest = (user: TUserSignup): Promise<TAxiosResp<any>> => {
  return api.post("/api/auth/signup/", user);
};
