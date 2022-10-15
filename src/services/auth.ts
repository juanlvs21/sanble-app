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
  signOut,
} from "@/helpers/firebase";
import {
  TAuthSignupForm,
  TAuthSigInForm,
  TAuthSignupExternal,
  TUser,
} from "@/types/TAuth";
import { AxiosResponse } from "axios";

// type TAuthParamsSigninGoogle = {
//   isDesktop: boolean;
// };

export const signOutRequest = () => signOut(auth);

export const signUpRequest = (user: TAuthSignupForm) =>
  api.post("/auth/signup", user);

export const signUpRequestExternal = (user: TAuthSignupExternal) =>
  api.post("/auth/signup/external", user);

export const getUserDataRequest = (): Promise<AxiosResponse<{ data: TUser }>> =>
  api.get("/auth/user");

export const signinRequest = async ({ email, password }: TAuthSigInForm) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signinGoogleRequest = async () => {
  auth.useDeviceLanguage();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
  // return params?.isDesktop
  //   ? signInWithPopup(auth, provider)
  //   : signInWithRedirect(auth, provider);
};

export const getSessionRequest = (nextOrObserver: NextOrObserver<User>) =>
  onAuthStateChanged(auth, nextOrObserver);
