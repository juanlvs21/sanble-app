import { Dispatch } from "react";

import { TFair } from "./TFairs";

export type TAction<T = any> = {
  type: string;
  payload?: T;
};

export type TErrors = {
  status: string;
  errors: string[];
};

export type TContextProps<T> = [T, Dispatch<TAction>];

// Data reducers
export type TFairsReducer = {
  list: TFair[];
  upcoming: TFair[];
};