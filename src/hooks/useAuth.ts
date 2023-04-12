import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useIonLoading } from "@ionic/react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

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
import { ERoutesName } from "@/types/TRoutes";
import { TAuthSigInForm, TAuthSignupForm, TUser } from "@/types/TUser";

type TClearSessionFuncParams = {
  withLogout?: boolean;
};

export const useAuth = () => {
  const { pathname } = useLocation();
  const [presentLoading, dismissLoading] = useIonLoading();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser } = useUser();
  const { isCapacitor } = useApp();

  const matchLanding = useMatch(ERoutesName.ROOT);
  const matchSignin = useMatch(ERoutesName.SESSION_SIGNIN);
  const matchSignup = useMatch(ERoutesName.SESSION_SIGNUP);

  const handleLoadUser = async () => {
    try {
      const userRes = await getUserDataRequest();
      setUser(userRes);
    } catch (error: any) {
      await signOutRequest();
      toast("Error al obtener la información del usuario", {
        type: "error",
      });
      navigate(ERoutesName.SESSION_SIGNIN, { replace: true });
    } finally {
      dismissLoading();
    }
  };

  const clearSessionRedirect = async (params?: TClearSessionFuncParams) => {
    await removeStorage(StorageUserKey);

    if (!matchLanding && !matchSignin && !matchSignup)
      navigate(ERoutesName.SESSION_SIGNIN, { replace: true });

    if (params?.withLogout) await signOutRequest();
  };

  const handleSignup = async (userForm: TAuthSignupForm) => {
    try {
      presentLoading();

      await signUpRequest(userForm);
      try {
        await signinRequest(userForm);
        await handleLoadUser();
        navigate(ERoutesName.APP, { replace: true });
      } catch (error) {
        await signOutRequest();
        await clearSessionRedirect({ withLogout: true });
      }
    } catch (error) {
      dismissLoading();
      toast(error, { type: "error" });
    }
  };

  const handleSignin = async (userForm: TAuthSigInForm) => {
    try {
      presentLoading();

      await signinRequest(userForm);
      await handleLoadUser();
      navigate(ERoutesName.APP, { replace: true });
    } catch (error: any) {
      await signOutRequest();
      dismissLoading();
      toast(error, { type: "error" });
    }
  };

  const handleSigninGoogle = async () => {
    try {
      presentLoading();

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

      navigate(ERoutesName.APP, { replace: true });
    } catch (error) {
      await signOutRequest();
      dismissLoading();
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
          navigate(ERoutesName.APP, { replace: true });
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
