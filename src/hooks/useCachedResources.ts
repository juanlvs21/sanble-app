// import * as Font from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import {useEffect, useState} from 'react';

export const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHideAsync();
        // Load fonts
        // await Font.loadAsync({
        //   "poppins-regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
        //   "poppins-medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
        //   "poppins-bold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
        //   "quicksand-bold": require("../assets/fonts/Quicksand-Bold.ttf"),
        // });
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
