import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type TAppState = {
  firstLoad: boolean;
  loadingFullScreen: boolean;
  showWelcome: boolean;
  showSplash: boolean;
};

const initialState: TAppState = {
  firstLoad: true,
  loadingFullScreen: false,
  showWelcome: false,
  showSplash: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFirstLoadAction: (state, action: PayloadAction<boolean>) => {
      state.firstLoad = action.payload;
    },
    setShowWelcomeAction: (state, action: PayloadAction<boolean>) => {
      state.showWelcome = action.payload;
    },
    setLoadingFullScreenAction: (state, action: PayloadAction<boolean>) => {
      state.loadingFullScreen = action.payload;
    },
    setShowSplashAction: (state, action: PayloadAction<boolean>) => {
      state.showSplash = action.payload;
    },
  },
});

export const {
  setFirstLoadAction,
  setShowSplashAction,
  setShowWelcomeAction,
  setLoadingFullScreenAction,
} = appSlice.actions;

export default appSlice.reducer;
