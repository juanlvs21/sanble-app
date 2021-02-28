import { useState } from "react";

// Utils
import { auth } from "../utils/firebase";

const useAccount = () => {
  const [loadingVerifyCode, setLoadingVerifyCode] = useState<boolean>(false);
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

  const handleVerifyResetPassword = async (actionCode: string) => {
    setLoadingVerifyCode(true);
    setErrors("");

    await auth
      .verifyPasswordResetCode(actionCode)
      .catch((error) => {
        console.error(error);

        if (error.code === "auth/expired-action-code")
          setErrors("El código de recuperación de contraseña ha expirado.");
        else
          setErrors(
            "Codigo para Restablecer Contraseña inválido o no pudo ser verificado."
          );
      })
      .finally(() => setLoadingVerifyCode(false));
  };

  const handleResetPassword = (actionCode: string, newPassword: string) => {
    setLoading(true);
    setErrors("");

    return new Promise(async (resolve, rejects) => {
      await auth
        .confirmPasswordReset(actionCode, newPassword)
        .then((resp) => {
          resolve(resp);
          console.log(resp);
        })
        .catch((error) => {
          console.error(error);
          setErrors(
            "Se produjo un error durante la confirmación. Es posible que el código haya caducado."
          );
          rejects(error);
        });
    });
  };

  return {
    loadingVerifyCode,
    loading,
    errors,
    handleVerifyEmail,
    handleVerifyResetPassword,
    handleResetPassword,
  };
};

export default useAccount;
