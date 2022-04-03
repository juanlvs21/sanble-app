import { TAction } from "@/types/TContext";
import { TApp } from "@/types/TApp";

import { appConstants } from "@/context/constants";

export const initialAppState: TApp = {
  showSidebar: false,
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

    default:
      return state;
  }
};
