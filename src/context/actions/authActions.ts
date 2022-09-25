import { Dispatch } from "react";

import { userConstants } from "@/context/constants";
import { TAction } from "@/types/TContext";
import { TUser } from "@/types/TAuth";

export const authActions = (dispatch: Dispatch<TAction>) => ({
  setUser: (user: TUser | null) =>
    dispatch({
      type: userConstants.SET_USER,
      payload: { user },
    }),
});
