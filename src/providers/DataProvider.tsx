import { App } from "@capacitor/app";
import { useIonAlert } from "@ionic/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Offline } from "@/components/common/Offline";
import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { useOnline } from "@/hooks/useOnline";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useUser } from "@/hooks/useUser";
import { Splash } from "@/screens/Splash";
import { getSessionRequest } from "@/services";
import { ERoutesName } from "@/types/TRoutes";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const DataProvider = ({ children }: ComponentProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [presentAlert] = useIonAlert();
  const {
    readyToUse,
    isMobile,
    handleSetReady,
    handleLoadData,
    handleShowSidebar,
    handleSetScrollTop,
    handleGetDeviceID,
  } = useApp();
  const { handleGetSession } = useAuth();
  const { user } = useUser();
  const { online } = useOnline();
  const { register, removeAllListeners } = usePushNotifications();

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
    App.addListener("backButton", ({ canGoBack }: any) => {
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
    if (
      !location.pathname.includes(ERoutesName.SESSION) &&
      readyToUse &&
      !user
    ) {
      navigate(ERoutesName.SESSION_SIGNIN, { replace: true });
    }
  }, [location.pathname]);

  useEffect(() => {
    register();

    return () => {
      removeAllListeners();
    };
  }, [user]);

  useEffect(() => {
    handleGetDeviceID();
  }, []);

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
