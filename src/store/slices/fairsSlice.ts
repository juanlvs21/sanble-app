import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TFair} from '@/types/fair';
import {ActivityIndicatorComponent} from 'react-native';

export type TFairsState = {
  list: TFair[];
};

const initialState: TFairsState = {
  list: [],
};

const getFairsStore = createAsyncThunk('fairs/getFairsStore', async () => {
  const fairs = await AsyncStorage.getItem('fairs');
  return fairs;
});

export const fairsSlice = createSlice({
  name: 'fairs',
  initialState,
  reducers: {
    setFairsAction: (state, action: PayloadAction<TFair[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getFairsStore.fulfilled, (state, action) => {
      // Add user to the state array
      state.list = action.payload;
    });
  },
});

export const {setFairsAction} = fairsSlice.actions;

export default fairsSlice.reducer;
