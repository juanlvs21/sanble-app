import { AxiosResponse } from "axios";

export type TAxiosResult<T> = {
  data: T;
  // pagination?: TPagination
};

export type TAxiosResp<T> = AxiosResponse<TAxiosResult<T>>;
