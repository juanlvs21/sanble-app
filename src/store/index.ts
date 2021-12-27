import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import app from './slices/appSlice';
import auth from './slices/authSlice';
import fairs from './slices/fairsSlice';

export const store = configureStore({
  reducer: {
    app,
    auth,
    fairs,
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
