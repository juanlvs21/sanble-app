import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TFair} from '@/types/fair';

export type TFairsState = {
  list: TFair[];
};

const initialState: TFairsState = {
  list: [],
};

export const fairsSlice = createSlice({
  name: 'fairs',
  initialState,
  reducers: {
    setFairsAction: (state, action: PayloadAction<TFair[]>) => {
      state.list = action.payload;
    },
  },
});

export const {setFairsAction} = fairsSlice.actions;

export default fairsSlice.reducer;
