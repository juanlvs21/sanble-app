import {TAction, TStandsReducer} from '@/types/context';

import {standsConstants} from '@/constants/context';

export const initialStandsState: TStandsReducer = {
  list: [],
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

    default:
      return state;
  }
};
