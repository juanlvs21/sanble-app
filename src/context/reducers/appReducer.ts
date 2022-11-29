import { TAction } from "@/types/TContext";
import { TApp } from "@/types/TApp";

import { appConstants } from "@/context/constants";

export const initialAppState: TApp = {
  readyToUse: false,
  showSidebar: false,
  openNotifications: false,
  scrollTop: 0,
  isLoadingFull: false,
  hideMobileWelcome: false,
};

export const appReducer = (state: TApp, action: TAction<TApp>): TApp => {
  switch (action.type) {
    case appConstants.SET_READY_TO_USE: {
      const readyToUse =
        action.payload?.readyToUse || initialAppState.readyToUse;

      return {
        ...state,
        readyToUse,
      };
    }
    case appConstants.SET_SHOW_SIDEBAR: {
      const showSidebar =
        action.payload?.showSidebar ?? initialAppState.showSidebar;

      return {
        ...state,
        showSidebar,
      };
    }
    case appConstants.SET_OPEN_NOTIFICATIONS: {
      const openNotifications =
        action.payload?.openNotifications ?? initialAppState.showSidebar;

      return {
        ...state,
        openNotifications,
      };
    }
    case appConstants.SET_SCROLL_TOP: {
      const scrollTop = action.payload?.scrollTop || 0;

      return {
        ...state,
        scrollTop,
      };
    }
    case appConstants.SET_IS_LOADING_FULL: {
      const isLoadingFull = action.payload?.isLoadingFull ?? false;

      return {
        ...state,
        isLoadingFull,
      };
    }
    case appConstants.SET_HIDE_MOBILE_WELCOME: {
      const hideMobileWelcome = action.payload?.hideMobileWelcome ?? false;

      return {
        ...state,
        hideMobileWelcome,
      };
    }

    default:
      return state;
  }
};
