import { Capacitor } from "@capacitor/core";

export const isNative = () => {
  const isNative = Capacitor.isNativePlatform();

  return isNative;
};
