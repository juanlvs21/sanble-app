import { toast as toastBase, ToastOptions } from "react-toastify";

import { unknownErrorMsg } from "@/helpers/constTexts";
import { errorsMessage } from "@/helpers/formatErrors";

export const useToast = () => {
  const toast = (errors: any, options?: ToastOptions) => {
    let messageArray: string[] = [];

    if (typeof errors === "string") messageArray = [errors];
    else messageArray = errorsMessage(errors);

    if (!messageArray.length) messageArray = [unknownErrorMsg];

    Array.from(new Set(messageArray)).forEach((msg, i) => {
      toastBase(msg, options);
    });
  };

  return {
    toast,
    POSITION: toastBase.POSITION,
  };
};
