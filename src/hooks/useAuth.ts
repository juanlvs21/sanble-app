import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useIonToast } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";

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
import { getStorage, removeStorage, setStorage } from "@/helpers/storage";
import { StorageUserKey } from "@/helpers/storageKeys";
import { useApp } from "@/hooks/useApp";
import { useUser } from "@/hooks/useUser";
import {
  getUserDataFetcher,
  signinGoogleRequest,
  signinRequest,
  signOutRequest,
  signUpRequest,
} from "@/services";
import { TAuthSigInForm, TAuthSignupForm, TUser } from "@/types/TUser";
import { useCustomNavigate } from "./useCustomNavigate";

type TClearSessionFuncParams = {
  withLogout?: boolean;
};

export const useAuth = () => {
  const { pathname } = useLocation();
  const [present] = useIonToast();
  const { navigate } = useCustomNavigate();
  const { user, setUser } = useUser();
  const { isCapacitor, setIsLoadingFull } = useApp();

  const matchLanding = useMatch("/");
  const matchSignin = useMatch("/app/sesion/entrar");
  const matchSignup = useMatch("/app/sesion/registrarse");

  const { data: userData, refetch: refetchUser } = useQuery(
    ["user"],
    getUserDataFetcher,
    {
      enabled: false,
      retry: 0,
      onError: async () => {
        await signOutRequest();
        present({
          message: "Error al obtener la información del usuario",
          duration: 5000,
          color: "danger",
        });
        navigate("/app/sesion/entrar", { replace: true });
        setIsLoadingFull(false);
      },
    }
  );

  useEffect(() => {
    if (userData) setUser(userData);
    setIsLoadingFull(false);
  }, [userData]);

  const clearSessionRedirect = async (params?: TClearSessionFuncParams) => {
    await removeStorage(StorageUserKey);

    if (!matchLanding && !matchSignin && !matchSignup)
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
      navigate("/app", { replace: true });
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

        if (pathname.includes("/sesion")) {
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
    handleSignup,
    handleSignin,
    handleSigninGoogle,
    handleSignOut,
    handleGetSession,
    clearSessionRedirect,
  };
};
