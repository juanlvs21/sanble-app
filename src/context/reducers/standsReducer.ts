import { TAction, TStandsReducer } from "@/types/TContext";
import { TStand } from "@/types/TStands";

import { standsConstants } from "@/context/constants";

export const initialStandsState: TStandsReducer = {
  list: [],
  bests: [],
};

export const standsReducer = (
  state: TStandsReducer,
  action: TAction<TStand[]>
): TStandsReducer => {
  switch (action.type) {
    case standsConstants.SET_STANDSLIST: {
      const list = action.payload || [];

      return {
        ...state,
        list,
      };
    }
    case standsConstants.SET_STANDSBESTS: {
      const bests = action.payload || [];

      return {
        ...state,
        bests,
      };
    }

    default:
      return state;
  }
};
