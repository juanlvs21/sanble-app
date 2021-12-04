import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IAuthState = {
  user: any;
};

const initialState: IAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserAction } = authSlice.actions;

export default authSlice.reducer;
