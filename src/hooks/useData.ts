import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {STORAGE_USER} from '@/constants/Storage';

export const useData = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetData = async () => {
    setLoading(true);
    try {
      const userStorage = await AsyncStorage.getItem(STORAGE_USER);
      console.log({userStorage});
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleGetData,
  };
};
