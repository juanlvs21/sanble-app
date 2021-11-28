import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import app from "@/store/reducer/appSlice";
import auth from "@/store/reducer/authSlice";

export const store = configureStore({
  reducer: {
    app,
    auth,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
