import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TUser} from '@/types/user';

export type TAuthState = {
  user: TUser | null;
};

const initialState: TAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const {setUserAction} = authSlice.actions;

export default authSlice.reducer;
