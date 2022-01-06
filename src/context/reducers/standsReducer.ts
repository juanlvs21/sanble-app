import {TAction, TStandsReducer} from '@/types/context';

import {standsConstants} from '@/constants/Context';

export const initialStandsState: TStandsReducer = {
  list: [],
  bests: [],
};

export const standsReducer = (
  state: TStandsReducer,
  action: TAction<TStandsReducer>,
): TStandsReducer => {
  switch (action.type) {
    case standsConstants.SET_STANDSLIST: {
      const {list} = action.payload;

      return {
        ...state,
        list,
      };
    }
    case standsConstants.SET_STANDSBESTS: {
      const {bests} = action.payload;

      return {
        ...state,
        bests,
      };
    }

    default:
      return state;
  }
};
