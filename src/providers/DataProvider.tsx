import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";

import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { Splash } from "@/screens/Splash";
import { getSessionRequest } from "@/services";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const DataProvider: React.FC<ComponentProps> = ({ children }) => {
  const navigate = useNavigate();
  const { readyToUse, handleSetReady, handleLoadData } = useApp();
  const { handleSetUser } = useAuth();

  const matchSignin = useMatch("/app/sesion/entrar");
  const matchSignup = useMatch("/app/sesion/registrarse");

  useEffect(() => {
    handleLoadData();

    getSessionRequest(async (user) => {
      if (user) {
        handleSetUser(user);
      } else {
        handleSetUser(null);
        if (!matchSignin && !matchSignup)
          navigate("/app/sesion/entrar", { replace: true });
      }
      handleSetReady(true);
    });
  }, []);

  return readyToUse ? <>{children}</> : <Splash />;
};
