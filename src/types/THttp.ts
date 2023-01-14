import { AxiosResponse } from "axios";

export type TAxiosResult<T> = {
  data: T;
  // pagination?: TPagination
};

export type TAxiosResp<T> = AxiosResponse<TAxiosResult<T>>;

export type TPagination = {
  total: number;
  lastIndex: number;
  limit: number;
};

export type TFormatError422 = {
  value: string;
  msg: string;
  param: string;
  location: string;
};

export type TResponseList<T> = {
  list: T;
  pagination: TPagination;
};
