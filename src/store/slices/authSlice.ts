import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { setData } from "@/helpers/storage";
import { TUser } from "@/types/TUser";

export type IAuthState = {
  logged: boolean;
  user: TUser;
};

const initialState: IAuthState = {
  logged: false,
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
      setData("user", initialState.user);
      state.user = initialState.user;
      setData("logged", false);
      state.logged = false;
    },
    setLoggedAction: (state, action: PayloadAction<boolean | null>) => {
      setData("logged", action.payload);
      state.logged = action.payload ?? false;
    },
    setUserAction: (state, action: PayloadAction<TUser | null>) => {
      setData("user", action.payload || initialState.user);
      state.user = action.payload || initialState.user;
      setData("logged", action.payload ? true : false);
      state.logged = action.payload ? true : false;
    },
  },
});

export const { setClearUserAction, setUserAction, setLoggedAction } =
  authSlice.actions;

export default authSlice.reducer;
