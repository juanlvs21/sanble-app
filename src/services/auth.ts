import { api } from "@/services";
import {
  auth,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "@/helpers/firebase";
import { TAuthSignupForm, TAuthSigInForm } from "@/types/TAuth";

export const signUpRequest = (user: TAuthSignupForm) =>
  api.post("/auth/signup", user);

export const signinRequest = async ({ email, password }: TAuthSigInForm) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const getSessionRequest = (nextOrObserver: NextOrObserver<User>) =>
  onAuthStateChanged(auth, nextOrObserver);
