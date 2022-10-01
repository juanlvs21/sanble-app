import { useIonToast } from "@ionic/react";
import { useNavigate } from "react-router-dom";

import { authActions } from "@/context/actions/authActions";
import { useAuthContext } from "@/context/AuthContext";
import { defaultAvatar } from "@/helpers/defaultImage";
import { User } from "@/helpers/firebase";
import {
  errorsFirebase,
  errorsMessageAPI,
} from "@/helpers/formatErrorsRequests";
import { formatUserDataFirebase } from "@/helpers/user";
import { signinGoogleRequest, signinRequest, signUpRequest } from "@/services";
import { TAuthSigInForm, TAuthSignupForm } from "@/types/TAuth";

export const useAuth = () => {
  const navigate = useNavigate();
  const [present] = useIonToast();
  const [{ user }, dispatch] = useAuthContext();
  const { setUser } = authActions(dispatch);

  const handleSetUser = (user: User | null) => {
    const userFormat = formatUserDataFirebase(user);
    setUser(userFormat);
  };

  const signinAndRedirect = async (userForm: TAuthSigInForm) => {
    const { user } = await signinRequest(userForm);
    handleSetUser(user);
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

  const handleSigninGoogle = async () => {
    try {
      const { user } = await signinGoogleRequest();
      handleSetUser(user);
      navigate("/app", { replace: true });
    } catch (error) {
      present({
        message: errorsFirebase(error),
        duration: 5000,
        color: "danger",
      });
    }
  };

  const getUser = () =>
    user ? { ...user, photoURL: user.photoURL || defaultAvatar } : null;

  return {
    user: getUser(),
    handleSetUser,
    handleSignup,
    handleSignin,
    handleSigninGoogle,
  };
};
