import {TAction, TAppReducer} from '@/types/context';

import {appConstants} from '@/constants/Context';

export const initialAppState: TAppReducer = {
  firstLoad: true,
  loadingFullScreen: false,
  hideWelcome: true,
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

    case appConstants.SET_SHOWHIDEWELCOME: {
      const {hideWelcome} = action.payload;

      return {
        ...state,
        hideWelcome,
      };
    }

    default:
      return state;
  }
};
