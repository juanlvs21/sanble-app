import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TMapsCoordinates} from '@/types/maps';

export type TMapsState = {
  currentPosition: TMapsCoordinates;
  locationAvailable: boolean;
};

const initialState: TMapsState = {
  currentPosition: {
    latitude: 0,
    longitude: 0,
  },
  locationAvailable: false,
};

export const mapsSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    setCurrentPositionAction: (
      state,
      action: PayloadAction<TMapsCoordinates>,
    ) => {
      state.currentPosition = action.payload;
    },
    setLocationAvailableAction: (state, action: PayloadAction<boolean>) => {
      state.locationAvailable = action.payload;
    },
  },
});

export const {setCurrentPositionAction, setLocationAvailableAction} =
  mapsSlice.actions;

export default mapsSlice.reducer;
