import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useIonToast } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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
import { StorageUserKey } from "@/helpers/storageKeys";
import { useApp } from "@/hooks/useApp";
import {
  getUserDataFetcher,
  signinGoogleRequest,
  signinRequest,
  signOutRequest,
  signUpRequest,
} from "@/services";
import { TAuthSigInForm, TAuthSignupForm, TUser } from "@/types/TAuth";
import { useCustomNavigate } from "./useCustomNavigate";
import { getStorage, removeStorage, setStorage } from "@/helpers/storage";

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

  const {
    data: userData,
    refetch: refetchUser,
    error: errorUser,
  } = useQuery(["user"], getUserDataFetcher, {
    enabled: false,
    retry: 0,
  });

  useEffect(() => {
    const handleSignOut = async () => {
      await signOutRequest();
      navigate("/app/sesion/entrar", { replace: true });
      setIsLoadingFull(false);
      present({
        message: "Error al obtener la información del usuario",
        duration: 5000,
        color: "danger",
      });
    };
    if (errorUser) handleSignOut();
  }, [errorUser]);

  useEffect(() => {
    if (userData) setUser(userData);
    setIsLoadingFull(false);
  }, [userData]);

  const clearSessionRedirect = async (params?: TClearSessionFuncParams) => {
    await removeStorage(StorageUserKey);

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
        await clearSessionRedirect({ withLogout: true });
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
      console.log({ userData });
      if (userData) navigate("/app", { replace: true });
    } catch (error) {
      await signOutRequest();
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
      await clearSessionRedirect();
    }
  };

  const handleGetSession = async (
    userFirebase: User | null,
    setReady: (ready: boolean) => void
  ) => {
    if (userFirebase) {
      const userStorage = await getStorage<TUser>(StorageUserKey);

      try {
        if (userStorage?.uid === userFirebase.uid) {
          await setStorage(StorageUserKey, user);
          setUser(userStorage);
          setReady(true);
        }
        await refetchUser();

        if (pathname.includes("/sesion") && userData) {
          navigate("/app", { replace: true });
        }
      } catch (error) {
        await clearSessionRedirect({ withLogout: true });
      }
    } else {
      await clearSessionRedirect();
    }
    setReady(true);
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
