import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

export interface IAppState {
  uiMode: PaletteMode;
}

const initialState: IAppState = {
  uiMode: "light",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUiModeAction: (state, action: PayloadAction<PaletteMode>) => {
      state.uiMode = action.payload;
    },
  },
});

export const { setUiModeAction } = appSlice.actions;

export default appSlice.reducer;
