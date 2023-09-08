import { AxiosResponse } from "axios";
import { OrderByDirection } from "firebase/firestore";

export type TAxiosResult<T> = {
  data: T;
  // pagination?: TPagination
};

export type TAxiosResp<T> = AxiosResponse<TAxiosResult<T>>;

export type TPagination = {
  lastIndex: number;
  limit: number;
  total: number;
};

export type TOrder = {
  orderBy: string;
  orderDir: OrderByDirection;
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
  order?: TOrder;
};
