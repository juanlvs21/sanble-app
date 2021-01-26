import { useState } from "react";

// Utils
import { login } from "../utils/services/API";
import emailValid from "../utils/validations/email";
import formatMessageToasts from "../utils/formatMessageToasts";

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const handleLogin = async (user: object) => {
    console.log("handleLogin");
    // setLoading(true);
    // setErrors([]);

    // await login
    //   .then((user: any) => {
    //     console.log(user);
    //   })
    //   .catch((error: any) => {
    setShowErrors(true);
    setErrors(formatMessageToasts(["2", "31", "#"]));
    //     console.error(error);

    //   });
  };

  return { loading, errors, showErrors, setShowErrors, handleLogin };
};

export default useAuth;
