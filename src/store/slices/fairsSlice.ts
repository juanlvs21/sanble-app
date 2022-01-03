import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TFair} from '@/types/fair';

export type TFairsState = {
  list: TFair[];
  upcoming: TFair[];
};

const initialState: TFairsState = {
  list: [],
  upcoming: [],
};

export const fairsSlice = createSlice({
  name: 'fairs',
  initialState,
  reducers: {
    setListFairsAction: (state, action: PayloadAction<TFair[]>) => {
      state.list = action.payload;
    },
    setUpcomingFairsAction: (state, action: PayloadAction<TFair[]>) => {
      state.upcoming = action.payload;
    },
  },
});

export const {setListFairsAction, setUpcomingFairsAction} = fairsSlice.actions;

export default fairsSlice.reducer;
