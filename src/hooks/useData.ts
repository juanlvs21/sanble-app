import SplashScreen from 'react-native-splash-screen';

import {useApp} from '@/hooks/useApp';

export const useData = () => {
  const {handleGetShowWelcome} = useApp();

  const handleGetData = async () => {
    try {
      await handleGetShowWelcome();
    } catch (e) {
      console.warn(e);
    } finally {
      SplashScreen.hide();
    }
  };

  return {
    handleGetData,
  };
};
