import { Dispatch } from "react";

import { authConstants } from "@/context/constants";
import { TAction } from "@/types/TContext";
import { TUser } from "@/types/TAuth";

export const authActions = (dispatch: Dispatch<TAction>) => ({
  setUser: (user: TUser | null) =>
    dispatch({
      type: authConstants.SET_USER,
      payload: { user },
    }),
});
