import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { setData } from "@/helpers/storage";
import { TUser } from "@/types/TUser";

export type IAuthState = {
  user: TUser;
};

const initialState: IAuthState = {
  user: {
    displayName: "",
    email: "",
    emailVerified: false,
    photoURL: "",
    providerId: "",
    uid: "",
    phoneNumber: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setClearUserAction: (state) => {
      state.user = initialState.user;
    },
    setUserAction: (state, action: PayloadAction<TUser>) => {
      setData("user", action.payload);
      state.user = action.payload;
    },
  },
});

export const { setClearUserAction, setUserAction } = authSlice.actions;

export default authSlice.reducer;
