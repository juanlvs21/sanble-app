import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useLocation, useRouteMatch, useHistory } from "react-router";

import {
  auth,
  GoogleAuthProvider,
  signInWithCredential,
  User,
} from "@/helpers/firebase";
import { getStorage, removeStorage, setStorage } from "@/helpers/storage";
import { StorageUserKey } from "@/helpers/storageKeys";
import { useApp } from "@/hooks/useApp";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import {
  getUserDataRequest,
  signinGoogleRequest,
  signinRequest,
  signOutRequest,
  signUpRequest,
} from "@/services";
import { TAuthSigInForm, TAuthSignupForm, TUser } from "@/types/TUser";

type TClearSessionFuncParams = {
  withLogout?: boolean;
};

export const useAuth = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { toast } = useToast();
  const { user, setUser } = useUser();
  const { isCapacitor, setIsLoadingFull } = useApp();

  const matchLanding = useRouteMatch({
    path: "/",
    exact: true,
  });
  const matchSignin = useRouteMatch({
    path: "/app/sesion/entrar",
    exact: true,
  });
  const matchSignup = useRouteMatch({
    path: "/app/sesion/registrarse",
    exact: true,
  });

  const handleLoadUser = async () => {
    setIsLoadingFull(true);

    try {
      const userRes = await getUserDataRequest();
      setUser(userRes);
    } catch (error: any) {
      await signOutRequest();
      toast("Error al obtener la información del usuario", {
        type: "error",
      });
      history.replace("/app/sesion/entrar");
    } finally {
      setIsLoadingFull(false);
    }
  };

  const clearSessionRedirect = async (params?: TClearSessionFuncParams) => {
    await removeStorage(StorageUserKey);

    if (!matchLanding && !matchSignin && !matchSignup)
      history.replace("/app/sesion/entrar");

    if (params?.withLogout) await signOutRequest();
  };

  const handleSignup = async (userForm: TAuthSignupForm) => {
    try {
      setIsLoadingFull(true);

      await signUpRequest(userForm);
      try {
        await signinRequest(userForm);
        await handleLoadUser();
        history.replace("/app/inicio");
      } catch (error) {
        await signOutRequest();
        await clearSessionRedirect({ withLogout: true });
      }
    } catch (error) {
      setIsLoadingFull(false);
      toast(error, { type: "error" });
    }
  };

  const handleSignin = async (userForm: TAuthSigInForm) => {
    try {
      setIsLoadingFull(true);

      await signinRequest(userForm);
      await handleLoadUser();
      history.replace("/app/inicio");
    } catch (error: any) {
      await signOutRequest();
      setIsLoadingFull(false);
      toast(error, { type: "error" });
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

      await handleLoadUser();

      history.replace("/app/inicio");
    } catch (error) {
      await signOutRequest();
      setIsLoadingFull(false);
      toast(error, { type: "error" });
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

        await handleLoadUser();

        if (pathname.includes("/sesion")) {
          history.replace("/app/inicio");
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
