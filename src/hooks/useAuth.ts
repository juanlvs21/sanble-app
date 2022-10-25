import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useIonToast } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";

import { authActions } from "@/context/actions/authActions";
import { useAuthContext } from "@/context/AuthContext";
import {
  auth,
  GoogleAuthProvider,
  signInWithCredential,
  User,
} from "@/helpers/firebase";
import {
  errorsFirebase,
  errorsMessageAPI,
} from "@/helpers/formatErrorsRequests";
import { useApp } from "@/hooks/useApp";
import {
  getUserDataFetcher,
  signinGoogleRequest,
  signinRequest,
  signOutRequest,
  signUpRequest,
} from "@/services";
import { TAuthSigInForm, TAuthSignupForm } from "@/types/TAuth";
import { useCustomNavigate } from "./useCustomNavigate";

type TClearSessionFuncParams = {
  withLogout?: boolean;
};

export const useAuth = () => {
  const { pathname } = useLocation();
  const [present] = useIonToast();
  const { navigate } = useCustomNavigate();
  const [{ user }, dispatch] = useAuthContext();
  const { setUser } = authActions(dispatch);
  const { isCapacitor, setIsLoadingFull } = useApp();

  const matchSignin = useMatch("/app/sesion/entrar");
  const matchSignup = useMatch("/app/sesion/registrarse");

  const { data: userData, refetch: refetchUser } = useQuery(
    ["user"],
    getUserDataFetcher,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (userData) setUser(userData);
    setIsLoadingFull(false);
  }, [userData]);

  const clearSessionRedirect = async (params?: TClearSessionFuncParams) => {
    if (!matchSignin && !matchSignup)
      navigate("/app/sesion/entrar", { replace: true });
    if (params?.withLogout) await signOutRequest();
  };

  const handleSignup = async (userForm: TAuthSignupForm) => {
    try {
      setIsLoadingFull(true);
      await signUpRequest(userForm);
      try {
        await signinRequest(userForm);
        await refetchUser();
        navigate("/app", { replace: true });
      } catch (error) {
        await signOutRequest();
        clearSessionRedirect({ withLogout: true });
      }
    } catch (error) {
      setIsLoadingFull(false);
      present({
        message: errorsMessageAPI(error),
        duration: 5000,
        color: "danger",
      });
    }
  };

  const handleSignin = async (userForm: TAuthSigInForm) => {
    try {
      setIsLoadingFull(true);
      await signinRequest(userForm);
      await refetchUser();
      navigate("/app", { replace: true });
    } catch (error: any) {
      await signOutRequest();
      setIsLoadingFull(false);
      present({
        message: errorsFirebase(error),
        duration: 5000,
        color: "danger",
      });
    }
  };

  const handleSigninGoogle = async () => {
    try {
      setIsLoadingFull(true);

      if (isCapacitor) {
        const googleUser = await GoogleAuth.signIn();
        const credential = GoogleAuthProvider.credential(
          googleUser.authentication.idToken
        );
        await signInWithCredential(auth, credential);
      } else {
        await signinGoogleRequest();
      }

      await refetchUser();
      navigate("/app", { replace: true });
    } catch (error) {
      setIsLoadingFull(false);
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
      clearSessionRedirect();
    }
  };

  const handleGetSession = async (userFirebase: User | null) => {
    if (userFirebase) {
      try {
        await refetchUser();

        if (pathname.includes("/sesion")) {
          navigate("/app", { replace: true });
        }
      } catch (error) {
        clearSessionRedirect({ withLogout: true });
      }
    } else {
      clearSessionRedirect();
    }
  };

  return {
    user,
    setUser,
    handleSignup,
    handleSignin,
    handleSigninGoogle,
    handleSignOut,
    handleGetSession,
    clearSessionRedirect,
  };
};
