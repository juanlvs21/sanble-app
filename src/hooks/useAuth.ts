import { useIonToast } from "@ionic/react";

import { signUpRequest } from "@/services/api";
import { TAuthSignupForm } from "@/types/TAuth";
import { errorsMessage } from "@/helpers/formatErrorsAPI";

export const useAuth = () => {
  const [present] = useIonToast();

  const handleSignup = async (user: TAuthSignupForm) => {
    try {
      const res = await signUpRequest(user);
      console.log(res);
    } catch (error) {
      present({
        message: errorsMessage(error),
        duration: 5000,
        color: "danger",
      });
    }
  };

  return {
    handleSignup,
  };
};
