import { useState } from "react";

// Utils
import { validateAccount } from "../utils/services/API";

const useAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<Boolean>(true);

  const handleActivateAccount = async (token: string) => {
    setLoading(true);
    setActive(false);

    return new Promise(async (resolve, rejects) => {
      await validateAccount(token)
        .then(() => {
          setActive(true);
          resolve("Valid Acount");
        })
        .catch((errors: any) => {
          console.error(errors);
          setActive(false);
          rejects("Invalid token");
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };
  return {
    loading,
    active,
    handleActivateAccount,
  };
};

export default useAccount;
