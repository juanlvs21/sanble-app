import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'native-base';

import {TStorageKey} from '@/types/storage';

export const useStorate = () => {
  const toast = useToast();

  const handleSetStorage = async (
    key: TStorageKey,
    value: any,
    nameError?: string,
  ) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@${key}`, jsonValue);
    } catch (e) {
      toast.show({
        description: `Error al guardar la información ${
          nameError ? 'de ' + nameError : ''
        }`,
        status: 'error',
      });
    }
  };
  const handleGetStorage = async (key: TStorageKey, nameError?: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      toast.show({
        description: `Error al cargar la información ${
          nameError ? 'de ' + nameError : ''
        }`,
        status: 'error',
      });
    }
  };

  return {
    handleSetStorage,
    handleGetStorage,
  };
};
