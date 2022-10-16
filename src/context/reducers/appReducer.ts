import { TAction } from "@/types/TContext";
import { TApp } from "@/types/TApp";

import { appConstants } from "@/context/constants";

export const initialAppState: TApp = {
  readyToUse: false,
  showSidebar: false,
  openNotifications: false,
  isDesktop: false,
  scrollTop: 0,
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
    case appConstants.SHOW_SIDEBAR: {
      const showSidebar =
        action.payload?.showSidebar ?? initialAppState.showSidebar;

      return {
        ...state,
        showSidebar,
      };
    }
    case appConstants.OPEN_NOTIFICATIONS: {
      const openNotifications =
        action.payload?.openNotifications ?? initialAppState.showSidebar;

      return {
        ...state,
        openNotifications,
      };
    }
    case appConstants.SET_IS_DESKTOP: {
      const isDesktop = action.payload?.isDesktop ?? false;

      return {
        ...state,
        isDesktop,
      };
    }
    case appConstants.SET_SCROLL_TOP: {
      const scrollTop = action.payload?.scrollTop || 0;

      return {
        ...state,
        scrollTop,
      };
    }

    default:
      return state;
  }
};
