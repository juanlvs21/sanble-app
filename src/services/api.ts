import axios, { AxiosResponse } from "axios";

import { API_URL } from "@/helpers/config/env";
import { TAuthSignupForm } from "@/types/TAuth";

export const api = axios.create({
  baseURL: API_URL,
});

export const signUpRequest = (user: TAuthSignupForm) =>
  api.post("/auth/signup", user);
