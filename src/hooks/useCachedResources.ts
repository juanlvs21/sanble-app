import {useEffect, useState} from 'react';
// import SplashScreen from 'react-native-splash-screen';

export const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHideAsync();
        // SplashScreen.show();
        // Load fonts
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

  return isLoadingComplete;
};
