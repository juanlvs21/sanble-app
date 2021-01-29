import { useState, useContext } from "react";

// Utils
import { login } from "../utils/services/API";
// import emailValid from "../utils/validations/email";

// Context
import { DataContext } from "../context/AppContext";

const useAuth = () => {
  const { session, setSessionUser } = useContext(DataContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [gettingSession, setGettingSession] = useState<boolean>(true);

  const handleLogin = async (user: object) => {
    setLoading(true);
    setShowErrors(false);
    setErrors("");

    await login(user)
      .then((res: any) => setSessionUser(res))
      .catch((errors: any) => {
        setErrors(errors);
        setShowErrors(true);
      })
      .finally(() => {
        setLoading(false);
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
    handleLogin,
    handleGetSession,
  };
};

export default useAuth;
