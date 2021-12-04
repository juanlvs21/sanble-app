import * as core from "@capacitor/core";

const { Storage } = core.Plugins;
const { isNativePlatform } = core.Capacitor;

type TKey = "uiMode" | "showWelcome" | "user";

export const setData = async (key: TKey, value: any): Promise<any> => {
  if (isNativePlatform()) {
    await Storage.set({
      key,
      value: JSON.stringify(value),
    });
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getData = async <T>(key: TKey): Promise<T | null> => {
  let returnData;

  if (isNativePlatform()) {
    const { value } = await Storage.get({ key });
    returnData = value ? JSON.parse(value) : null;
  } else {
    const value = localStorage.getItem(key);
    returnData = value ? JSON.parse(value) : null;
  }

  // if value is "true" or "false" convert to boolean type
  if (returnData === "false" || returnData === "true")
    returnData = returnData === "true";

  return returnData;
};
