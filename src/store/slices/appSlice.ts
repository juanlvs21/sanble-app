import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type TAppState = {
  firstLoad: boolean;
  showWelcome: boolean;
  gettingSession: boolean;
  loadingFullScreen: boolean;
};

const initialState: TAppState = {
  firstLoad: true,
  showWelcome: true,
  gettingSession: true,
  loadingFullScreen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFirstLoadAction: (state, action: PayloadAction<boolean>) => {
      state.firstLoad = action.payload;
    },
    seGettingSessionAction: (state, action: PayloadAction<boolean>) => {
      state.gettingSession = action.payload;
    },
    setShowWelcomeAction: (state, action: PayloadAction<boolean>) => {
      state.showWelcome = action.payload;
    },
    setLoadingFullScreenAction: (state, action: PayloadAction<boolean>) => {
      state.loadingFullScreen = action.payload;
    },
  },
});

export const {
  setFirstLoadAction,
  seGettingSessionAction,
  setShowWelcomeAction,
  setLoadingFullScreenAction,
} = appSlice.actions;

export default appSlice.reducer;
