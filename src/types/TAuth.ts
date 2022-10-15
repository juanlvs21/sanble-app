import { UserInfo, UserMetadata } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type TAuthSignupForm = {
  name: string;
  email: string;
  password: string;
};

export type TAuthSignupExternal = {
  email: string;
};

export type TAuthSigInForm = {
  email: string;
  password: string;
};

export type TUser = {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  disabled: boolean;
  metadata: UserMetadata;
  providerData: UserInfo[];
  isAdmin: boolean;
  creationTime: Timestamp;
  verifyTokens: {
    expiresIn: Timestamp;
    token: string;
  };
};

export type TAuth = {
  user: TUser | null;
};
