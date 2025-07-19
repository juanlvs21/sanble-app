import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useIonLoading } from "@ionic/react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  recoveryPasswordRequest,
  signinGoogleRequest,
  signinRequest,
  signOutRequest,
  signUpRequest,
} from "@/services";
import { ERoutesName } from "@/types/TRoutes";
import {
  TAuthSigInForm,
  TAuthSignupForm,
  TRecoverPassword,
  TUser,
} from "@/types/TUser";

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
    }
  };

  const clearSessionRedirect = async (params?: TClearSessionFuncParams) => {
    await removeStorage(StorageUserKey);

    if (!matchLanding && !pathname.startsWith(ERoutesName.SESSION))
      navigate(ERoutesName.SESSION_SIGNIN, { replace: true });

    if (params?.withLogout) await signOutRequest();
  };

  const handleSignup = async (userForm: TAuthSignupForm) => {
    try {
      await presentLoading();

      await signUpRequest(userForm);
      try {
        await signinRequest(userForm);
        if (isCapacitor) {
          navigate(ERoutesName.APP, { replace: true });
        } else {
          location.replace(ERoutesName.APP);
        }
      } catch (error) {
        await signOutRequest();
        await clearSessionRedirect({ withLogout: true });
      }
    } catch (error) {
      await dismissLoading();
      toast(error, { type: "error" });
    }
  };

  const handleSignin = async (userForm: TAuthSigInForm) => {
    try {
      await presentLoading();
      await signinRequest(userForm);
      window.location.replace(ERoutesName.APP);
      // navigate(ERoutesName.APP, { replace: true });
    } catch (error: any) {
      await signOutRequest();
      await dismissLoading();
      toast(error, { type: "error" });
    }
  };

  const handleSigninGoogle = async () => {
    try {
      await presentLoading();

      if (isCapacitor) {
        const googleUser = await GoogleAuth.signIn();
        const credential = GoogleAuthProvider.credential(
          googleUser.authentication.idToken
        );
        await signInWithCredential(auth, credential);
      } else {
        await signinGoogleRequest();
      }

      // navigate(ERoutesName.APP, { replace: true });
      window.location.replace(ERoutesName.APP);
    } catch (error) {
      await signOutRequest();
      await dismissLoading();
      toast(error, { type: "error" });
    }
  };

  const handleSignOut = async () => {
    try {
      await presentLoading();
      await signOutRequest();
    } finally {
      await clearSessionRedirect();
      await dismissLoading();
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
        await dismissLoading();
      } catch (error) {
        await clearSessionRedirect({ withLogout: true });
      }
    } else {
      await clearSessionRedirect();
    }
    setReady(true);
  };

  const handleRecoveryPassword = async (recoveryForm: TRecoverPassword) => {
    try {
      await recoveryPasswordRequest(recoveryForm);
      navigate(ERoutesName.SESSION_RECOVERY_PASSWORD_SUCCESS, {
        replace: true,
      });
    } catch (error: any) {
      toast(error, { type: "error" });
    }
  };

  useEffect(() => {
    if (isCapacitor) {
      GoogleAuth.initialize();
    }
  }, []);

  return {
    handleSignup,
    handleSignin,
    handleSigninGoogle,
    handleSignOut,
    handleGetSession,
    handleRecoveryPassword,
    clearSessionRedirect,
  };
};
