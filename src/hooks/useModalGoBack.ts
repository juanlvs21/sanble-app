import { App } from "@capacitor/app";
import { useEffect } from "react";

export const useModalGoBack = (isOpen: boolean, handleDismiss: () => void) => {
  useEffect(() => {
    if (isOpen) {
      App.addListener("backButton", () => handleDismiss());
    } else App.removeAllListeners();

    return () => {
      App.removeAllListeners();
    };
  }, [isOpen]);
};
