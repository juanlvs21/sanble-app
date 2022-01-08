import Geolocation from 'react-native-geolocation-service';
import ConnectivityManager from 'react-native-connectivity-status';

import {useStateValue} from '@/context/app';
import {mapsConstants} from '@/constants/Context';

export const useMaps = () => {
  const [{maps}, dispatch] = useStateValue();

  const handleSetLocationAvailable = (status: boolean) => {
    dispatch({
      type: mapsConstants.SET_MAPSLOCATIONAVAILABLE,
      payload: {locationAvailable: status},
    });
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
        dispatch({
          type: mapsConstants.SET_MAPSCURRENTPOSITION,
          payload: {currentPosition: coords},
        });
      },
      error => {
        console.log({getCurrentPositionError: error});
      },
      {
        enableHighAccuracy: true,
        forceRequestLocation: true,
        showLocationDialog: false,
      },
    );
  };

  return {
    handleGetGPSEnabled,
    handleGetCurrentPosition,
    handleSetLocationAvailable,
    currentPosition: maps.currentPosition,
    currentCoordinate: [
      maps.currentPosition.longitude,
      maps.currentPosition.latitude,
    ],
    locationAvailable: maps.locationAvailable,
  };
};
