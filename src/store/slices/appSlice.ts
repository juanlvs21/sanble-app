import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

import { setData, getData } from "@/helpers/storage";

export type IAppState = {
  uiMode: PaletteMode;
  showSplash: boolean;
  showWelcome: boolean;
  gettingSession: boolean;
  loadingFullScreen: boolean;
};

const initialState: IAppState = {
  uiMode: "light",
  showSplash: true,
  showWelcome: true,
  gettingSession: true,
  loadingFullScreen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    seGettingSessionAction: (state, action: PayloadAction<boolean>) => {
      state.gettingSession = action.payload;
    },
    setShowSplashAction: (state, action: PayloadAction<boolean>) => {
      state.showSplash = action.payload;
    },
    setUiModeAction: (state, action: PayloadAction<PaletteMode>) => {
      setData("uiMode", action.payload);
      state.uiMode = action.payload;
    },
    setShowWelcomeAction: (state, action: PayloadAction<boolean>) => {
      setData("showWelcome", action.payload);
      state.showWelcome = action.payload;
    },
    setLoadingFullScreenAction: (state, action: PayloadAction<boolean>) => {
      state.loadingFullScreen = action.payload;
    },
  },
});

export const {
  setUiModeAction,
  seGettingSessionAction,
  setShowWelcomeAction,
  setShowSplashAction,
  setLoadingFullScreenAction,
} = appSlice.actions;

export default appSlice.reducer;
