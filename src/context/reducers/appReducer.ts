import {TAction, TAppReducer} from '@/types/context';

import {appConstants} from '@/constants/Context';

export const initialAppState: TAppReducer = {
  firstLoad: true,
  loadingFullScreen: false,
  showWelcome: true,
};

export const appReducer = (
  state: TAppReducer,
  action: TAction<TAppReducer>,
): TAppReducer => {
  switch (action.type) {
    case appConstants.SET_FIRSTLOAD: {
      const {firstLoad} = action.payload;

      return {
        ...state,
        firstLoad,
      };
    }

    case appConstants.SET_LOADINGFULLSCREEN: {
      const {loadingFullScreen} = action.payload;

      return {
        ...state,
        loadingFullScreen,
      };
    }

    case appConstants.SET_SHOWWELCOME: {
      const {showWelcome} = action.payload;

      return {
        ...state,
        showWelcome,
      };
    }

    default:
      return state;
  }
};
