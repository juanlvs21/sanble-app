import { useState } from "react";

// Utils
import { auth } from "../utils/firebase";

const useAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  const handleVerifyEmail = async (actionCode: string) => {
    setLoading(true);
    setErrors("");

    return await auth
      .applyActionCode(actionCode)
      .catch((error) => {
        console.error(error);
        setErrors("Ha ocurrido un error realizar la acción.");
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return {
    loading,
    errors,
    handleVerifyEmail,
  };
};

export default useAccount;
