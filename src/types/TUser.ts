export type TUserSignin = {
  email: string;
  password: string;
};

export type TUserSignup = TUserSignin & {
  name: string;
};
