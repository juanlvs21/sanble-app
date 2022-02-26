import { TAction, TFairsReducer } from "../../types/TContext";
import { TFair } from "../../types/TFairs";

import { fairsConstants } from "../constants";

export const initialFairsState: TFairsReducer = {
  list: [],
  upcoming: [],
};

export const fairsReducer = (
  state: TFairsReducer,
  action: TAction<TFair[]>
): TFairsReducer => {
  switch (action.type) {
    case fairsConstants.SET_FAIRSLIST: {
      const list = action.payload || [];

      return {
        ...state,
        list,
      };
    }
    case fairsConstants.SET_FAIRSUPCOMING: {
      const upcoming = action.payload || [];

      return {
        ...state,
        upcoming,
      };
    }

    default:
      return state;
  }
};
