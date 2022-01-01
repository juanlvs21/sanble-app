import {TAction, TAuthReducer} from '@/types/context';

import {authConstants} from '@/constants/context';

export const initialAuthState: TAuthReducer = {
  user: null,
};

export const authReducer = (
  state: TAuthReducer,
  action: TAction<TAuthReducer>,
): TAuthReducer => {
  switch (action.type) {
    case authConstants.SET_USER: {
      const {user} = action.payload;

      return {
        ...state,
        user,
      };
    }

    default:
      return state;
  }
};
