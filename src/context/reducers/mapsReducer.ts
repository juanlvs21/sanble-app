import {TAction, TMapsReducer} from '@/types/context';

import {mapsConstants} from '@/constants/Context';

export const initialMapsState: TMapsReducer = {
  currentPosition: {
    latitude: 0,
    longitude: 0,
  },
  locationAvailable: false,
};

export const mapsReducer = (
  state: TMapsReducer,
  action: TAction<TMapsReducer>,
): TMapsReducer => {
  switch (action.type) {
    case mapsConstants.SET_MAPSCURRENTPOSITION: {
      const {currentPosition} = action.payload;

      return {
        ...state,
        currentPosition,
      };
    }
    case mapsConstants.SET_MAPSLOCATIONAVAILABLE: {
      const {locationAvailable} = action.payload;

      return {
        ...state,
        locationAvailable,
      };
    }

    default:
      return state;
  }
};
