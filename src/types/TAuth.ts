import { UserInfo } from "firebase/auth";

export type TAuthSignupForm = {
  name: string;
  email: string;
  password: string;
};

export type TAuthSigInForm = {
  email: string;
  password: string;
};

export type TUser = {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  photoURL: string;
  providerData: UserInfo[];
  providerId: string;
};
