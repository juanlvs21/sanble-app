import React, {useEffect} from 'react';
import ConnectivityManager from 'react-native-connectivity-status';

import {Splash} from '@/components/common/Splash';
import {useData} from '@/hooks/useData';
import {useMaps} from '@/hooks/useMaps';

type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement;
};

export const DataProvider: React.FC<ComponentProps> = ({children}) => {
  const {handleGetData, loading} = useData();
  const {
    handleGetGPSEnabled,
    handleGetCurrentPosition,
    handleSetLocationAvailable,
    locationAvailable,
  } = useMaps();

  useEffect(() => {
    setTimeout(() => {
      handleGetData();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return <Splash loading={loading}>{children}</Splash>;
};
