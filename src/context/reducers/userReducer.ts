import { TAction } from "@/types/TContext";
import { TUser } from "@/types/TAuth";

import { userConstants } from "@/context/constants";

export const initialUserState: TUser = {
  uid: "",
  displayName: "",
  email: "",
  emailVerified: false,
  phoneNumber: "",
  photoURL: "",
  providerData: [],
  providerId: "",
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
