import {Dispatch} from 'react';

import {TUser} from '@/types/user';
import {TFair} from '@/types/fair';
import {TStand} from '@/types/stand';
import {TMapsCoordinates} from '@/types/maps';

export type TAction<T = any> = {
  type: string;
  payload: T;
};

export type TStateContext = {
  app: TAppReducer;
  auth: TAuthReducer;
  fairs: TFairsReducer;
  stands: TStandsReducer;
  maps: TMapsReducer;
};

export type TContextProps = [TStateContext, Dispatch<TAction>];

// Data reducers
export type TAppReducer = {
  firstLoad: boolean;
  hideWelcome: boolean;
  loadingFullScreen: boolean;
};

export type TAuthReducer = {
  user: TUser | null;
};

export type TFairsReducer = {
  list: TFair[];
  upcoming: TFair[];
};

export type TStandsReducer = {
  list: TStand[];
  bests: TStand[];
};

export type TMapsReducer = {
  currentPosition: TMapsCoordinates;
  locationAvailable: boolean;
};
