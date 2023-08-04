import {
  auth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "@/helpers/firebase";
import { TAuthSigInForm, TRecoverPassword } from "@/types/TUser";
import { api } from "@/services/api";
import { AxiosResponse } from "axios";

export const signOutRequest = () => signOut(auth);

export const signinRequest = async ({ email, password }: TAuthSigInForm) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signinGoogleRequest = async () => {
  auth.useDeviceLanguage();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const getSessionRequest = (nextOrObserver: NextOrObserver<User>) =>
  onAuthStateChanged(auth, nextOrObserver);

export const recoveryPasswordRequest = (recoveryForm: TRecoverPassword) =>
  api
    .post<AxiosResponse>("/user/recovery-password", recoveryForm)
    .then(({ data }) => data.data);
