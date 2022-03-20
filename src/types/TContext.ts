import { Dispatch } from "react";

export type TAction<T = any> = {
  type: string;
  payload?: T;
};

export type TErrors = {
  status: string;
  errors: string[];
};

export type TContextProps<T> = [T, Dispatch<TAction>];
