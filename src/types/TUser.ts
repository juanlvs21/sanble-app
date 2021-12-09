export type TUserSignin = {
  email: string;
  password: string;
};

export type TUserSignup = TUserSignin & {
  name: string;
};

export type TUser = {
  uid?: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber?: string | null;
  photoURL: string | null;
  providerId: string;
};
