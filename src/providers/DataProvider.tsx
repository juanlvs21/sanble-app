import { App } from "@capacitor/app";
import { useIonAlert } from "@ionic/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { useStatusBar } from "@/hooks/useStatusBar";
import { useUser } from "@/hooks/useUser";
import { Splash } from "@/screens/Splash";
import { getSessionRequest } from "@/services";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const DataProvider: React.FC<ComponentProps> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [presentAlert] = useIonAlert();
  const { readyToUse, isMobile, handleSetReady, handleLoadData } = useApp();
  const { handleGetSession } = useAuth();
  const { user } = useUser();
  const { overlaysStatusBar } = useStatusBar();

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
    App.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) {
        navigate(-1);
      } else {
        presentAlert({
          header: "¿Cerrar ahora?",
          buttons: [
            {
              text: "No",
              role: "cancel",
            },
            {
              text: "Si",
              role: "confirm",
              handler: () => App.exitApp(),
            },
          ],
        });
      }
    });

    return () => {
      App.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    overlaysStatusBar(true);

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
