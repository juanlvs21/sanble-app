import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/useToast";
import { recoveryPasswordRequest } from "@/services";
import { ERoutesName } from "@/types/TRoutes";
import { TRecoverPassword } from "@/types/TUser";

export const useRecoveryPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRecoveryPassword = async (recoveryForm: TRecoverPassword) => {
    try {
      setIsLoading(true);
      await recoveryPasswordRequest(recoveryForm);
      navigate(ERoutesName.SESSION_RECOVERY_PASSWORD_SUCCESS, {
        replace: true,
      });
    } catch (error: any) {
      setIsLoading(false);
      toast(error, { type: "error" });
    }
  };

  return {
    handleRecoveryPassword,
    isLoading,
  };
};
