import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useIonToast } from "@ionic/react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

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
import { TAuthSigInForm, TAuthSignupForm, TUser } from "@/types/TAuth";

type TClearSessionFuncParams = {
  withLogout?: boolean;
};

export const useAuth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [present] = useIonToast();
  const [{ user }, dispatch] = useAuthContext();
  const { setUser } = authActions(dispatch);
  const { isCapacitor, setIsLoadingFull } = useApp();

  const matchSignin = useMatch("/app/sesion/entrar");
  const matchSignup = useMatch("/app/sesion/registrarse");

  const clearSessionRedirect = async (params?: TClearSessionFuncParams) => {
    if (!matchSignin && !matchSignup)
      navigate("/app/sesion/entrar", { replace: true });
    if (params?.withLogout) await signOutRequest();
    setIsLoadingFull(false);
  };

  const handleSignup = async (userForm: TAuthSignupForm) => {
    try {
      setIsLoadingFull(true);
      await signUpRequest(userForm);
      try {
        await signinRequest(userForm);
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

  const handleGetSession = async (
    userFirebase: User | null,
    refetchUser: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<TUser, unknown>>
  ) => {
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
    setIsLoadingFull(false);
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
    getUserDataFetcher,
  };
};
