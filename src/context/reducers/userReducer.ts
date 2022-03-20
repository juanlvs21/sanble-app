import { TAction } from "@/types/TContext";
import { TUser } from "@/types/TUser";

import { userConstants } from "@/context/constants";

export const initialUserState: TUser = {
  id: "",
  email: "",
  username: "",
  name: "",
  phoneNumber: "",
  photoUrl: "",
  createdAt: "",
};

export const userReducer = (state: TUser, action: TAction<TUser>): TUser => {
  switch (action.type) {
    case userConstants.SET_USER: {
      const user = action.payload;

      return {
        ...state,
        ...user,
      };
    }

    default:
      return state;
  }
};
