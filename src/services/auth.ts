import { api } from "@/services";
import {
  auth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  User,
} from "@/helpers/firebase";
import { TAuthSignupForm, TAuthSigInForm } from "@/types/TAuth";

type TAuthParamsSigninGoogle = {
  isWeb: boolean;
};

export const signUpRequest = (user: TAuthSignupForm) =>
  api.post("/auth/signup", user);

export const signinRequest = async ({ email, password }: TAuthSigInForm) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signinGoogleRequest = async (params?: TAuthParamsSigninGoogle) => {
  auth.useDeviceLanguage();
  const provider = new GoogleAuthProvider();

  return params?.isWeb
    ? signInWithPopup(auth, provider)
    : signInWithRedirect(auth, provider);
};

export const getSessionRequest = (nextOrObserver: NextOrObserver<User>) =>
  onAuthStateChanged(auth, nextOrObserver);
