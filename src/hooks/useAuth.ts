import { useIonToast } from "@ionic/react";
import { useNavigate } from "react-router-dom";

import { userActions } from "@/context/actions/userActions";
import { useUserContext } from "@/context/UserContext";
import {
  errorsFirebase,
  errorsMessageAPI,
} from "@/helpers/formatErrorsRequests";
import { formatUserDataFirebase } from "@/helpers/user";
import { signinRequest, signUpRequest } from "@/services";
import { TAuthSigInForm, TAuthSignupForm } from "@/types/TAuth";

export const useAuth = () => {
  const navigate = useNavigate();
  const [present] = useIonToast();
  const [, dispatch] = useUserContext();
  const { setUser } = userActions(dispatch);

  const signinAndRedirect = async (userForm: TAuthSigInForm) => {
    const res = await signinRequest(userForm);
    const user = formatUserDataFirebase(res);
    setUser(user);
    navigate("/app", { replace: true });
  };

  const handleSignup = async (userForm: TAuthSignupForm) => {
    try {
      await signUpRequest(userForm);
      try {
        await signinAndRedirect(userForm);
      } catch (error) {
        navigate("/app/sesion/entrar", { replace: true });
      }
    } catch (error) {
      present({
        message: errorsMessageAPI(error),
        duration: 5000,
        color: "danger",
      });
    }
  };

  const handleSignin = async (userForm: TAuthSigInForm) => {
    try {
      await signinAndRedirect(userForm);
    } catch (error: any) {
      present({
        message: errorsFirebase(error),
        duration: 5000,
        color: "danger",
      });
    }
  };

  return {
    handleSignup,
    handleSignin,
  };
};
