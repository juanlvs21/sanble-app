import { Dispatch } from "react";

import { userConstants } from "@/context/constants";
import { TAction } from "@/types/TContext";
import { TUser } from "@/types/TUser";

export const userActions = (dispatch: Dispatch<TAction>) => ({
  setUser: (data: TUser) =>
    dispatch({
      type: userConstants.SET_USER,
      payload: data,
    }),
});
