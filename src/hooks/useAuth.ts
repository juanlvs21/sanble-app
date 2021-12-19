import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { signupRequest } from "@/helpers/api";
import { auth } from "@/helpers/firebase";
import { messageErrors } from "@/helpers/messageErrors";
import {
  seGettingSessionAction,
  setLoadingFullScreenAction,
} from "@/store/slices/appSlice";
import { setUserAction, setClearUserAction } from "@/store/slices/authSlice";
import { TUser, TUserSignin, TUserSignup } from "@/types/TUser";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userStore = useAppSelector(({ auth }) => auth.user);
  const loggedStore = useAppSelector(({ auth }) => auth.logged);
  const gettingSession = useAppSelector(({ app }) => app.gettingSession);

  const handleSignup = async (userForm: TUserSignup) => {
    dispatch(setLoadingFullScreenAction(true));

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
      dispatch(setLoadingFullScreenAction(false));
    } catch (error) {
      dispatch(setLoadingFullScreenAction(false));
      messageErrors(error).map((err) => {
        toast(err, { type: "error" });
      });
    }
  };

  const handleSignin = async ({ email, password }: TUserSignin) => {
    dispatch(setLoadingFullScreenAction(true));

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
      dispatch(setLoadingFullScreenAction(false));
    } catch (error: any) {
      dispatch(setLoadingFullScreenAction(false));
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
    console.info("Start getting session");
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

        if (["/", "/auth", "/auth/signin", "/auth/signup"].includes(pathname)) {
          navigate("/in");
        }

        console.info("Session successfully obtained");
      } else {
        dispatch(setClearUserAction());
        dispatch(seGettingSessionAction(false));
        console.info("Unauthorized");
      }
    });
  };

  const handleLogout = () => {
    return new Promise(async (resolve) => {
      dispatch(setLoadingFullScreenAction(true));
      try {
        await signOut(auth);
      } finally {
        dispatch(setClearUserAction());
        dispatch(setLoadingFullScreenAction(false));
        resolve("Logout success");
      }
    });
  };

  return {
    gettingSession,
    handleSignup,
    handleSignin,
    handleGeSession,
    handleLogout,
    user: userStore,
    logged: loggedStore,
  };
};
