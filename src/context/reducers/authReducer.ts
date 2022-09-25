import { TAction } from "@/types/TContext";
import { TAuth } from "@/types/TAuth";

import { userConstants } from "@/context/constants";

export const initialUserState: TAuth = {
  user: null,
};

export const authReducer = (state: TAuth, action: TAction<TAuth>): TAuth => {
  switch (action.type) {
    case userConstants.SET_USER: {
      const user = action.payload?.user || null;

      return {
        ...state,
        user,
      };
    }

    default:
      return state;
  }
};
