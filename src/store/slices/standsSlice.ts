import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TStand} from '@/types/stand';

export type TStandsState = {
  list: TStand[];
  bests: TStand[];
};

const initialState: TStandsState = {
  list: [],
  bests: [],
};

export const standsSlice = createSlice({
  name: 'stands',
  initialState,
  reducers: {
    setListStandsAction: (state, action: PayloadAction<TStand[]>) => {
      state.list = action.payload;
    },
    setBestsStandsAction: (state, action: PayloadAction<TStand[]>) => {
      state.bests = action.payload;
    },
  },
});

export const {setListStandsAction, setBestsStandsAction} = standsSlice.actions;

export default standsSlice.reducer;
