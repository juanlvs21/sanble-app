import { App } from "@capacitor/app";
import { useIonAlert } from "@ionic/react";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";

import { Offline } from "@/components/common/Offline";
import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { useOnline } from "@/hooks/useOnline";
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

export const DataProvider = ({ children }: ComponentProps) => {
  const location = useLocation();
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const {
    readyToUse,
    isMobile,
    handleSetReady,
    handleLoadData,
    handleShowSidebar,
    handleSetScrollTop,
  } = useApp();
  const { handleGetSession } = useAuth();
  const { user } = useUser();
  const { overlaysStatusBar } = useStatusBar();
  const { online } = useOnline();

  useEffect(() => {
    handleSetScrollTop();
    handleShowSidebar(false);
  }, [location]);

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
        history.go(-1);
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

    if (!location.pathname.includes("/app/sesion") && readyToUse && !user) {
      history.replace("/app/sesion/entrar");
    }
  }, [location.pathname]);

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
      {!online && <Offline />}
    </>
  ) : (
    <Splash />
  );
};
