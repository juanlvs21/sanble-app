import { Preferences } from "@capacitor/preferences";

export const setStorage = async <T = any>(key: string, value: T) => {
  await Preferences.set({
    key,
    value: JSON.stringify(value),
  });
};

export const getStorage = async <T = any>(
  key: string
): Promise<T | undefined> => {
  const { value } = await Preferences.get({ key });
  return value ? JSON.parse(value) : undefined;
};

export const removeStorage = async (key: string) => {
  await Preferences.remove({ key });
};
