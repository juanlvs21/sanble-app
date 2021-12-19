import { Storage } from "@capacitor/storage";

type TKey = "uiMode" | "showWelcome" | "user" | "logged";

export const setData = async (key: TKey, value: any): Promise<any> => {
  await Storage.set({
    key,
    value: JSON.stringify(value),
  });
};

export const getData = async <T>(key: TKey): Promise<T | null> => {
  const { value } = await Storage.get({ key });
  return value ? JSON.parse(value) : null;
};
