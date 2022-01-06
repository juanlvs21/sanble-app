import {TAction, TFairsReducer} from '@/types/context';

import {fairsConstants} from '@/constants/Context';

export const initialFairsState: TFairsReducer = {
  list: [],
  upcoming: [],
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
    case fairsConstants.SET_FAIRSUPCOMING: {
      const {upcoming} = action.payload;

      return {
        ...state,
        upcoming,
      };
    }

    default:
      return state;
  }
};
