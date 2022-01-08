import React, {useEffect} from 'react';
import ConnectivityManager from 'react-native-connectivity-status';

import {useMaps} from '@/hooks/useMaps';

export type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement;
};

export const MapsProvider: React.FC<ComponentProps> = ({children}) => {
  const {
    handleGetGPSEnabled,
    handleGetCurrentPosition,
    handleSetLocationAvailable,
    locationAvailable,
  } = useMaps();

  useEffect(() => {
    // Listen to the events of the GPS status.
    handleGetGPSEnabled();

    const connectivityStatusSubscription =
      ConnectivityManager.addStatusListener(({eventType, status}: any) => {
        switch (eventType) {
          case 'location':
            handleSetLocationAvailable(status);
            break;
          default:
            break;
        }
      });

    () => connectivityStatusSubscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Saves initial value of GPS status
    handleGetCurrentPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationAvailable]);

  return children;
};
