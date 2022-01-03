import Geolocation from 'react-native-geolocation-service';
import ConnectivityManager from 'react-native-connectivity-status';

import {useAppSelector, useAppDispatch} from '@/hooks/useStore';
import {
  setCurrentPositionAction,
  setLocationAvailableAction,
} from '@/store/slices/mapsSlice';
import {TMapsCoordinates} from '@/types/maps';

export const useMaps = () => {
  const dispatch = useAppDispatch();
  const currentPositionStore = useAppSelector(({maps}) => maps.currentPosition);
  const locationAvailableStore = useAppSelector(
    ({maps}) => maps.locationAvailable,
  );

  const handleSetLocationAvailable = (status: boolean) => {
    dispatch(setLocationAvailableAction(status));
  };

  const handleGetGPSEnabled = async () => {
    // Function to set the current state of GPS in the store.
    const locationServicesAvailable =
      await ConnectivityManager.areLocationServicesEnabled();

    handleSetLocationAvailable(locationServicesAvailable);
  };

  const handleGetCurrentPosition = () => {
    // Function to get the current coordinates of the user. In case of not having the GPS active, it shows a notification to activate it.
    Geolocation.getCurrentPosition(
      ({coords}) => {
        dispatch(setCurrentPositionAction(coords as TMapsCoordinates));
      },
      error => {
        console.log({getCurrentPositionError: error});
      },
      {
        enableHighAccuracy: true,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  };

  return {
    handleGetGPSEnabled,
    handleGetCurrentPosition,
    handleSetLocationAvailable,
    currentPosition: currentPositionStore,
    currentCoordinate: [
      currentPositionStore.longitude,
      currentPositionStore.latitude,
    ],
    locationAvailable: locationAvailableStore,
  };
};
