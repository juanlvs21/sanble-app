import { TAction } from "@/types/TContext";
import { TApp } from "@/types/TApp";

import { appConstants } from "@/context/constants";

export const initialAppState: TApp = {
  showSidebar: false,
  openNotifications: false,
};

export const appReducer = (state: TApp, action: TAction<TApp>): TApp => {
  switch (action.type) {
    case appConstants.SHOW_SIDEBAR: {
      const showSidebar = action.payload?.showSidebar ?? false;

      return {
        ...state,
        showSidebar,
      };
    }
    case appConstants.OPEN_NOTIFICATIONS: {
      const openNotifications = action.payload?.openNotifications ?? false;

      return {
        ...state,
        openNotifications,
      };
    }

    default:
      return state;
  }
};
