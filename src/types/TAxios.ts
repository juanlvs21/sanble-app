import { AxiosResponse } from "axios";

export type TAxiosResult<T> = {
  data: T;
};

export type TAxiosResp<T> = AxiosResponse<TAxiosResult<T>>;
