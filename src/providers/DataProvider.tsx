import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

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
  const { pathname } = useLocation();
  const { readyToUse, handleSetReady, handleLoadData } = useApp();
  const { setUser, getUserDataFetcher, user: userStore } = useAuth();

  const matchSignin = useMatch("/app/sesion/entrar");
  const matchSignup = useMatch("/app/sesion/registrarse");

  const { data: userData, refetch: refetchUser } = useQuery(
    ["user"],
    getUserDataFetcher,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    setUser(userData || null);
  }, [userData]);

  useEffect(() => {
    handleLoadData();

    getSessionRequest(async (user) => {
      if (user) {
        await refetchUser();

        if (pathname.includes("/sesion")) {
          navigate("/app", { replace: true });
        }
      } else {
        setUser(null);
        if (!matchSignin && !matchSignup)
          navigate("/app/sesion/entrar", { replace: true });
      }
      handleSetReady(true);
    });
  }, []);

  return readyToUse ? <>{children}</> : <Splash />;
};
