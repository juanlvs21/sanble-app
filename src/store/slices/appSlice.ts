import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type TAppState = {
  showSplash: boolean;
  showWelcome: boolean;
  gettingSession: boolean;
  loadingFullScreen: boolean;
};

const initialState: TAppState = {
  showSplash: true,
  showWelcome: true,
  gettingSession: true,
  loadingFullScreen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    seGettingSessionAction: (state, action: PayloadAction<boolean>) => {
      state.gettingSession = action.payload;
    },
    setShowSplashAction: (state, action: PayloadAction<boolean>) => {
      state.showSplash = action.payload;
    },
    setShowWelcomeAction: (state, action: PayloadAction<boolean>) => {
      state.showWelcome = action.payload;
    },
    setLoadingFullScreenAction: (state, action: PayloadAction<boolean>) => {
      state.loadingFullScreen = action.payload;
    },
  },
});

export const {
  seGettingSessionAction,
  setShowWelcomeAction,
  setShowSplashAction,
  setLoadingFullScreenAction,
} = appSlice.actions;

export default appSlice.reducer;
