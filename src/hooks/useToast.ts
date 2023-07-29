import { toast as toastBase, ToastOptions } from "react-toastify";

import { unknownErrorMsg } from "@/helpers/constants";
import { errorsMessage } from "@/helpers/formatErrors";

type TOptions = ToastOptions & {
  errorCode?: string;
};

export const useToast = () => {
  const toast = (errors: any, options?: TOptions) => {
    if (options?.errorCode !== "ERR_CANCELED") {
      let messageArray: string[] = [];

      if (typeof errors === "string") messageArray = [errors];
      else messageArray = errorsMessage(errors);

      if (!messageArray.length) messageArray = [unknownErrorMsg];

      Array.from(new Set(messageArray)).forEach((msg, i) => {
        toastBase(msg, options);
      });
    }
  };

  return {
    toast,
    toastDismiss: toastBase.dismiss,
    POSITION: toastBase.POSITION,
  };
};
