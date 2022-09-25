import { User } from "firebase/auth";

import { TUser } from "@/types/TAuth";

export const formatUserDataFirebase: (user: User | null) => TUser | null = (
  user
) =>
  user
    ? {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber || "",
        photoURL: user.photoURL || "",
        providerData: user.providerData,
        providerId: user.providerId,
      }
    : null;
