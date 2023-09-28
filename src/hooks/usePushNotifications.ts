import { PushNotifications } from "@capacitor/push-notifications";

import { useApp } from "@/hooks/useApp";

export const usePushNotifications = () => {
  const { isCapacitor } = useApp();

  const register = () => {
    if (isCapacitor) {
      PushNotifications.register();

      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification) => {
          // Maneja la notificación recibida
          console.log("Notificación recibida:", notification);
        }
      );

      PushNotifications.addListener("registration", (token) => {
        // Envía este token a tu servidor para poder enviar notificaciones push a este dispositivo.
        console.log("FCM token:", token.value);
      });
    }
  };

  const removeAllListeners = () => {
    if (isCapacitor) {
      PushNotifications.removeAllListeners();
    }
  };

  return {
    register,
    removeAllListeners,
  };
};
