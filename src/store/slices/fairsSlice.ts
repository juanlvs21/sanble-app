import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

import { TFair } from "@/types/Fairs";

export type IFairsState = {
  list: TFair[];
};

const initialState: IFairsState = {
  list: [],
};

export const fairsSlice = createSlice({
  name: "fairs",
  initialState,
  reducers: {
    setFairsAction: (state, action: PayloadAction<TFair[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setFairsAction } = fairsSlice.actions;

export default fairsSlice.reducer;
