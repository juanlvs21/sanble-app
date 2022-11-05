import { AxiosResponse } from "axios";

export type TAxiosResult<T> = {
  data: T;
  // pagination?: TPagination
};

export type TAxiosResp<T> = AxiosResponse<TAxiosResult<T>>;

export type TPagination = {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type formatData422 = {
  value: string;
  msg: string;
  param: string;
  location: string;
};
