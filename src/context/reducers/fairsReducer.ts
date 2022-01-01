import {TAction, TFairsReducer} from '@/types/context';

import {fairsConstants} from '@/constants/context';

export const initialFairsState: TFairsReducer = {
  list: [],
};

export const fairsReducer = (
  state: TFairsReducer,
  action: TAction<TFairsReducer>,
): TFairsReducer => {
  switch (action.type) {
    case fairsConstants.SET_FAIRSLIST: {
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
