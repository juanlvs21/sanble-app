import { Dispatch } from "react";

import { authConstants } from "@/context/constants";
import { removeStorage, setStorage } from "@/helpers/storage";
import { StorageUserKey } from "@/helpers/storageKeys";
import { TUser } from "@/types/TUser";
import { TAction } from "@/types/TContext";

export const authActions = (dispatch: Dispatch<TAction>) => ({
  setUser: async (user: TUser | null) => {
    if (user) {
      await setStorage(StorageUserKey, user);
    } else {
      await removeStorage(StorageUserKey);
    }

    return dispatch({
      type: authConstants.SET_USER,
      payload: { user },
    });
  },
});
