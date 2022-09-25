import { UserCredential } from "firebase/auth";

import { TUser } from "@/types/TAuth";

export const formatUserDataFirebase: (credentials: UserCredential) => TUser = ({
  user,
}: UserCredential) => ({
  uid: user.uid,
  displayName: user.displayName || "",
  email: user.email || "",
  emailVerified: user.emailVerified,
  phoneNumber: user.phoneNumber || "",
  photoURL: user.photoURL || "",
  providerData: user.providerData,
  providerId: user.providerId,
});
