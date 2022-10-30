import { TAction } from "@/types/TContext";
import { TAuth } from "@/types/TUser";

import { authConstants } from "@/context/constants";

export const initialUserState: TAuth = {
  user: null,
};

export const authReducer = (state: TAuth, action: TAction<TAuth>): TAuth => {
  switch (action.type) {
    case authConstants.SET_USER: {
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
