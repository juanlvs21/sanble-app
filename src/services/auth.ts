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
import { api } from "@/services";
import { TAuthSigInForm, TAuthSignupForm, TUser } from "@/types/TAuth";

export const signOutRequest = () => signOut(auth);

export const signUpRequest = (user: TAuthSignupForm): Promise<TUser> =>
  api.post("/user/signup", user).then(({ data }) => data.data);

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

export const getUserDataFetcher = (): Promise<TUser> =>
  api.get("/user/profile").then(({ data }) => data.data);
