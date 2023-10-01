import {
  ActionPerformed,
  PushNotificationSchema,
} from "@capacitor/push-notifications";

export enum ENotificationType {
  FAIR_NEW = "FAIR_NEW",
  FAIR_POST = "FAIR_POST",
  FAIR_PHOTO = "FAIR_PHOTO",
  STAND_NEW = "STAND_NEW",
  STAND_POST = "STAND_POST",
  STAND_PHOTO = "STAND_PHOTO",
  STAND_PRODUCT = "STAND_PRODUCT",
}

export type TNotificationToken = {
  token: string;
  deviceID: string;
};

export type TNotification = Omit<ActionPerformed, "notification"> & {
  notification: Omit<PushNotificationSchema, "data"> & {
    data: {
      "google.delivered_priority": string;
      "google.original_priority": string;
      fairID?: string;
      standID?: string;
      postID?: string;
      from: string;
      type: ENotificationType;
      collapse_key: string;
      redirectURL: string;
    };
  };
};
