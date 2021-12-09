import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { signupRequest } from "@/helpers/api";
import { auth } from "@/helpers/firebase";
import { messageErrors } from "@/helpers/messageErrors";
import { seGettingSessionAction } from "@/store/slices/appSlice";
import { setUserAction, setClearUserAction } from "@/store/slices/authSlice";
import { TUser, TUserSignin, TUserSignup } from "@/types/TUser";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);

  const userStore = useAppSelector(({ auth }) => auth.user);
  const gettingSession = useAppSelector(({ app }) => app.gettingSession);

  const handleSignup = async (userForm: TUserSignup) => {
    setLoading(true);

    try {
      await signupRequest(userForm);
      const { user } = await signInWithEmailAndPassword(
        auth,
        userForm.email,
        userForm.password
      );
      const dispatchUser: TUser = {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        providerId: user.providerId,
        uid: user.uid,
        phoneNumber: user.phoneNumber,
      };

      dispatch(setUserAction(dispatchUser));
      navigate("/in");
    } catch (error) {
      setLoading(false);
      messageErrors(error).map((err) => {
        toast(err, { type: "error" });
      });
    }
  };

  const handleSignin = async ({ email, password }: TUserSignin) => {
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const dispatchUser: TUser = {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        providerId: user.providerId,
        uid: user.uid,
        phoneNumber: user.phoneNumber,
      };

      dispatch(setUserAction(dispatchUser));
      navigate("/in");
    } catch (error: any) {
      setLoading(false);
      if (
        ["auth/wrong-password", "auth/user-not-found"].includes(error?.code)
      ) {
        toast("Direccion de correo electrónico o contraseña incorrecto", {
          type: "error",
        });
      } else {
        messageErrors(error).map((err) => {
          toast(err, { type: "error" });
        });
      }
    }
  };

  const handleGeSession = () => {
    return new Promise((resolve) => {
      dispatch(seGettingSessionAction(true));

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const dispatchUser: TUser = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            providerId: user.providerId,
            uid: user.uid,
            phoneNumber: user.phoneNumber,
          };
          dispatch(setUserAction(dispatchUser));
          dispatch(seGettingSessionAction(false));

          if (
            ["/", "/auth", "/auth/signin", "/auth/signup"].includes(pathname)
          ) {
            navigate("/in");
          }

          resolve(user);
        } else {
          dispatch(setClearUserAction());
          dispatch(seGettingSessionAction(false));
          resolve("Sesion no iniciada");
        }
      });
    });
  };

  return {
    gettingSession,
    loading,
    handleSignup,
    handleSignin,
    handleGeSession,
    user: userStore,
  };
};
