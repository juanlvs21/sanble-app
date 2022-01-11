/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
  ParamListBase,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type TBasicScreen = {
  title?: string;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  FairDetails: {
    id: string;
  };
  StandDetails: {
    id: string;
  };
  PromotionList: {
    type: string;
  };
  MySanble: undefined;
  Favorites: undefined;
  NearYou: undefined;
  Profile: undefined;
  Messages: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: TBasicScreen;
  NearYou: TBasicScreen & {
    navbarMap?: boolean;
  };
  Fairs: TBasicScreen;
  Stands: TBasicScreen;
  Profile: TBasicScreen;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type TRoute<T> = RouteProp<{params: T} & ParamListBase, 'params'>;

export type TRouteParamsNavbar = {
  navbarMap?: boolean;
  title?: string;
};
