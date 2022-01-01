import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import app from '@/store/slices/appSlice';
import auth from '@/store/slices/authSlice';
import fairs from '@/store/slices/fairsSlice';
import stands from '@/store/slices/standsSlice';

export const store = configureStore({
  reducer: {
    app,
    auth,
    fairs,
    stands,
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
