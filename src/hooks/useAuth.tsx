import { useState, useContext } from "react";

// Utils
import { login, register } from "../utils/services/API";

// Context
import { DataContext } from "../context/AppContext";

const useAuth = () => {
  const { session, setSessionUser } = useContext(DataContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [gettingSession, setGettingSession] = useState<boolean>(true);

  const setDataError = (errs: any) => {
    setErrors(errs ? errs : "");
    setShowErrors(errs ? true : false);
  };

  const handleLogin = async (user: object) => {
    setLoading(true);
    setShowErrors(false);
    setErrors("");

    return new Promise(async (resolve, rejects) => {
      await login(user)
        .then((res: any) => {
          setSessionUser(res);
          resolve(true);
        })
        .catch((errors: any) => {
          setDataError(errors);
          rejects(false);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleRegister = async (user: object) => {
    setLoading(true);
    setShowErrors(false);
    setErrors("");

    return new Promise(async (resolve, rejects) => {
      await register(user)
        .then((res: any) => {
          setSessionUser(res);
          resolve(true);
        })
        .catch((errors: any) => {
          setDataError(errors);
          rejects(false);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleGetSession = async () => {
    setGettingSession(true);
    await setTimeout(() => {
      setGettingSession(false);
    }, 2000);
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
  };
};

export default useAuth;
