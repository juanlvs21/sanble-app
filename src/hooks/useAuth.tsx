import { useState, useContext } from "react";

// Context
import { DataContext } from "../context/AppContext";

// Utils
import { register, recoverPassword } from "../utils/services/API";
import { auth } from "../utils/firebase";

const useAuth = () => {
  const { session, setSessionUser, getSessionStorage } = useContext(
    DataContext
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [gettingSession, setGettingSession] = useState<boolean>(true);

  const setDataError = (errs: any) => {
    setErrors(errs ? errs : "");
    setShowErrors(errs ? true : false);
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setDataError(null);

    return new Promise(async (resolve, rejects) => {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }: any) => {
          setSessionUser({
            user: {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              displayName: user.displayName,
              photoURL: user.photoURL,
              creationTime: user.metadata.creationTime,
              lastSignInTime: user.metadata.lastSignInTime,
            },
            meta: {
              refreshToken: user.refreshToken,
            },
          });
          resolve(session);
        })
        .catch((error) => {
          console.error(error);
          if (error.code === "auth/user-not-found")
            setDataError("Correo electrónico no registrado.");
          else if (error.code === "auth/invalid-email")
            setDataError("Ingrese un correo electrónico válido.");
          else if (error.code === "auth/wrong-password")
            setDataError("La contraseña no es válida.");
          else setDataError("Error desconocido.");
          rejects(errors);
        })
        .finally(() => setLoading(false));
    });
  };

  const handleRegister = async (user: object) => {
    setLoading(true);
    setDataError(null);

    return new Promise(async (resolve, rejects) => {
      await register(user)
        .then((res: any) => {
          setSessionUser(res);
          resolve(res);
        })
        .catch((errors: any) => {
          setDataError(errors);
          rejects(errors);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleRecoverPassword = async (email: string) => {
    setLoading(true);
    setDataError(null);

    return new Promise(async (resolve, rejects) => {
      await recoverPassword({ email })
        .then((res: any) => resolve(res))
        .catch((errors: any) => {
          setDataError(errors);
          rejects(errors);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleGetSession = async () => {
    setGettingSession(false);
    try {
      const data = await getSessionStorage();
      if (data) setSessionUser(data);

      await auth.onAuthStateChanged((user) => {
        if (user) {
          setSessionUser({
            user: {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              displayName: user.displayName,
              photoURL: user.photoURL,
              creationTime: user.metadata.creationTime,
              lastSignInTime: user.metadata.lastSignInTime,
            },
            meta: {
              refreshToken: user.refreshToken,
            },
          });
          setGettingSession(false);
        } else {
          setSessionUser(null);
          setGettingSession(false);
        }
      });
    } catch (error) {
      console.error(error);
      setSessionUser(null);
      setGettingSession(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
      setSessionUser(null);
    }
  };

  return {
    session,
    gettingSession,
    loading,
    errors,
    showErrors,
    setSessionUser,
    setShowErrors,
    setDataError,
    handleLogin,
    handleRegister,
    handleGetSession,
    handleRecoverPassword,
    handleLogout,
  };
};

export default useAuth;
