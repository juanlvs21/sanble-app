import axios, { AxiosInstance } from "axios";

// Config
import { API_URL } from "@/config/env";

export const apiCreate: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json", crossDomain: "true" },
});

export const controllerApi = new AbortController();

apiCreate.interceptors.request.use(
  function (config: any) {
    // const { in_a } = getAllCookie()
    // if (in_a) {
    //   config.headers.common.Authorization = `Bearer ${in_a}`
    // }

    config.signal = controllerApi.signal;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * Api requests by axios
 */
export const api = apiCreate;
