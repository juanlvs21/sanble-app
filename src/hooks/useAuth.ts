import { useIonToast } from "@ionic/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authActions } from "@/context/actions/authActions";
import { useAuthContext } from "@/context/AuthContext";
import { getAdditionalUserInfo } from "@/helpers/firebase";
import {
  errorsFirebase,
  errorsMessageAPI,
} from "@/helpers/formatErrorsRequests";
import {
  getUserDataRequest,
  signinGoogleRequest,
  signinRequest,
  signOutRequest,
  signUpRequest,
  signUpRequestExternal,
} from "@/services";
import { TAuthSigInForm, TAuthSignupForm } from "@/types/TAuth";

export const useAuth = () => {
  const navigate = useNavigate();
  const [present] = useIonToast();
  const [{ user }, dispatch] = useAuthContext();
  const { setUser } = authActions(dispatch);
  const [loadingGoogle, setloadingGoogle] = useState(false);

  const signinAndRedirect = async (userForm: TAuthSigInForm) => {
    await signinRequest(userForm);
    const {
      data: { data: user },
    } = await getUserDataRequest();
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
      await signOutRequest();
      setUser(null);

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
      await signOutRequest();
      setUser(null);

      present({
        message: errorsFirebase(error),
        duration: 5000,
        color: "danger",
      });
    }
  };

  const handleSigninGoogle = async () => {
    try {
      setloadingGoogle(true);
      const resGoogle = await signinGoogleRequest();
      const {
        data: { data: user },
      } = await getUserDataRequest();
      try {
        const additionalUserInfo = getAdditionalUserInfo(resGoogle);
        if (additionalUserInfo?.isNewUser) {
          await signUpRequestExternal({ email: user.email || "" });
        }
      } finally {
        setUser(user);
        navigate("/app", { replace: true });
        setloadingGoogle(false);
      }
    } catch (error) {
      setloadingGoogle(false);
      present({
        message: errorsFirebase(error),
        duration: 5000,
        color: "danger",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutRequest();
    } finally {
      setUser(null);
      navigate("/app/sesion/entrar", { replace: true });
    }
  };

  return {
    user,
    setUser,
    handleSignup,
    handleSignin,
    handleSigninGoogle,
    handleSignOut,
    getUserDataRequest,
    loadingGoogle,
  };
};
