import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { Splash } from "@/screens/Splash";
import { getSessionRequest } from "@/services";
import { useUser } from "@/hooks/useUser";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const DataProvider: React.FC<ComponentProps> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { readyToUse, isMobile, handleSetReady, handleLoadData } = useApp();
  const { handleGetSession } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    handleLoadData();

    const unsubscribe = getSessionRequest(async (userFirebase) => {
      await handleGetSession(userFirebase, handleSetReady);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!pathname.includes("/app/sesion") && readyToUse && !user) {
      navigate("/app/sesion/entrar", { replace: true });
    }
  }, [pathname]);

  return readyToUse ? (
    <>
      {children}
      <ToastContainer
        closeOnClick
        theme="light"
        autoClose={5000}
        position={
          isMobile ? toast.POSITION.BOTTOM_CENTER : toast.POSITION.BOTTOM_RIGHT
        }
      />
    </>
  ) : (
    <Splash />
  );
};
