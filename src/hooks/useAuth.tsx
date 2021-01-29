import { useState } from "react";

// Utils
import { login } from "../utils/services/API";
// import emailValid from "../utils/validations/email";

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const handleLogin = async (user: object) => {
    setLoading(true);
    setShowErrors(false);
    setErrors("");

    await login(user)
      .then((res: any) => console.log(res))
      .catch((errors: any) => {
        setErrors(errors);
        setShowErrors(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, errors, showErrors, setShowErrors, handleLogin };
};

export default useAuth;
