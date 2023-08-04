import { UserInfo, UserMetadata } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export enum EUserFav {
  FAIR = "fair",
  STAND = "stand",
  PRODUCT = "product",
}

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
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  favoriteFairs: string[];
  favoriteStands: string[];
  favoriteProducts: string[];
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

export type TUserFavorites = {
  favorites: string[];
};

export type TUpdateUser = {
  email: string;
  displayName: string;
  phoneNumber: string;
};

export type TChangePassword = {
  password: string;
  confirmPassword?: string;
};

export type TRecoverPassword = {
  email: string;
};
