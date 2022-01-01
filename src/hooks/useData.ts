import {useEffect, useState} from 'react';
// import SplashScreen from 'react-native-splash-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const useData = () => {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHideAsync();
        // SplashScreen.show();
        // Load fonts
        // const fairsStore = await AsyncStorage.getItem('fairs');
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        // SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return {
    isLoadingComplete,
  };
};
