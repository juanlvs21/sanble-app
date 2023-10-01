import { PushNotifications, Token } from "@capacitor/push-notifications";
import { useNavigate } from "react-router-dom";

import { useApp } from "@/hooks/useApp";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { saveNotificationTokenRequest } from "@/services/notification";
import { TNotification } from "@/types/TNotification";

export const usePushNotifications = () => {
  const navigate = useNavigate();
  const { isCapacitor, deviceID } = useApp();
  const { user } = useUser();
  const { toast } = useToast();

  const saveNotificationToken = async (token: string) => {
    if (isCapacitor) {
      try {
        await saveNotificationTokenRequest({ token, deviceID });
      } catch (error) {
        console.log("Error saving notification token", error);
      }
    }
  };

  const register = () => {
    if (isCapacitor) {
      removeAllListeners();

      if (user) {
        PushNotifications.requestPermissions().then((result) => {
          if (result.receive === "granted") {
            PushNotifications.register();
          }
        });

        PushNotifications.addListener("registration", async (token: Token) => {
          await saveNotificationToken(token.value);
        });

        PushNotifications.addListener("registrationError", () => {
          toast("Ha ocurrido un error con notificaciones emergentes", {
            type: "error",
          });
        });

        PushNotifications.addListener(
          "pushNotificationActionPerformed",
          (notification: TNotification) => {
            if (notification.notification.data?.redirectURL) {
              navigate(notification.notification.data?.redirectURL, {
                replace: true,
              });
            }
          }
        );
      }
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
