import axios from "axios";

import { API_URL } from "@/helpers/config/env";
import { auth } from "@/helpers/firebase";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async function (config: any) {
  try {
    if (auth.currentUser) {
      const idToken = await auth.currentUser
        .getIdToken
        // /* forceRefresh */ true
        ();
      config.headers.common.Authorization = idToken;
    }
  } catch (error) {}

  return config;
});
