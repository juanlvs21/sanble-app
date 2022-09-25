import { useEffect } from "react";

import { Splash } from "@/screens/Splash";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/hooks/useApp";
import { getSessionRequest } from "@/services";
import { useAuth } from "@/hooks/useAuth";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const DataProvider: React.FC<ComponentProps> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { readyToUse, handleSetReady } = useApp();
  const { handleSetUser } = useAuth();

  useEffect(() => {
    if (pathname === "/") {
      handleSetReady(true);
    } else {
      getSessionRequest(async (user) => {
        if (user) {
          handleSetUser(user);
        } else {
          handleSetUser(null);
          navigate("/app/sesion/entrar", { replace: true });
        }
        handleSetReady(true);
      });
    }
  }, []);

  return readyToUse ? <>{children}</> : <Splash />;
};
