import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TUser} from '@/types/user';

export type TAuthState = {
  logged: boolean;
  user: TUser | null;
};

const initialState: TAuthState = {
  logged: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setClearUserAction: state => {
      state.user = initialState.user;
      state.logged = false;
    },
    setLoggedAction: (state, action: PayloadAction<boolean | null>) => {
      state.logged = action.payload ?? false;
    },
    setUserAction: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const {setClearUserAction, setUserAction, setLoggedAction} =
  authSlice.actions;

export default authSlice.reducer;
