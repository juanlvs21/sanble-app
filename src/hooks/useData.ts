import SplashScreen from 'react-native-splash-screen';

import {useApp} from '@/hooks/useApp';

export const useData = () => {
  const {handleGetHideWelcome} = useApp();

  const handleGetData = async () => {
    try {
      await handleGetHideWelcome();
    } catch (e) {
      console.warn(e);
    } finally {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
  };

  return {
    handleGetData,
  };
};
