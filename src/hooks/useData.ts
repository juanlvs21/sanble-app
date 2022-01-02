import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {STORAGE_USER} from '@/constants/Storage';

export const useData = () => {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        const userSoore = await AsyncStorage.getItem(STORAGE_USER);
        console.log({userSoore});
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return {
    isLoadingComplete,
  };
};
