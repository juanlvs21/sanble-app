import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TStand} from '@/types/stand';

export type TStandsState = {
  list: TStand[];
};

const initialState: TStandsState = {
  list: [],
};

export const standsSlice = createSlice({
  name: 'stands',
  initialState,
  reducers: {
    setStandsAction: (state, action: PayloadAction<TStand[]>) => {
      state.list = action.payload;
    },
  },
});

export const {setStandsAction} = standsSlice.actions;

export default standsSlice.reducer;
