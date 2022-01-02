import {Dispatch} from 'react';

import {TUser} from '@/types/user';
import {TFair} from '@/types/fair';
import {TStand} from '@/types/stand';

export type TAction<T = any> = {
  type: string;
  payload: T;
};

export type TStateContext = {
  app: TAppReducer;
  auth: TAuthReducer;
  fairs: TFairsReducer;
  stands: TStandsReducer;
};

export type TContextProps = [TStateContext, Dispatch<TAction>];

// Data reducers
export type TAppReducer = {
  showSplash: boolean;
  firstLoad: boolean;
  showWelcome: boolean;
  loadingFullScreen: boolean;
};

export type TAuthReducer = {
  user: TUser | null;
};

export type TFairsReducer = {
  list: TFair[];
};

export type TStandsReducer = {
  list: TStand[];
};
