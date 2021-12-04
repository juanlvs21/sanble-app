import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

import { getData } from "@/helpers/storage";

export type IAppState = {
  showSplash: boolean;
  uiMode: PaletteMode;
  showWelcome: boolean;
};

const initialState: IAppState = {
  showSplash: true,
  uiMode: "light",
  showWelcome: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowSplashAction: (state, action: PayloadAction<boolean>) => {
      state.showSplash = action.payload;
    },
    setUiModeAction: (state, action: PayloadAction<PaletteMode>) => {
      state.uiMode = action.payload;
    },
    setShowWelcome: (state, action: PayloadAction<boolean>) => {
      state.showWelcome = action.payload;
    },
  },
});

export const { setUiModeAction, setShowWelcome, setShowSplashAction } =
  appSlice.actions;

export default appSlice.reducer;
