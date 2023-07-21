import { IonCol, IonContent, useIonLoading } from "@ionic/react";
import { Outlet, useLocation } from "react-router-dom";

import styles from "./Auth.module.css";

import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { TabBar } from "@/components/modules/auth/TabBar";
import { useApp } from "@/hooks/useApp";
import { ERoutesName } from "@/types/TRoutes";
import { useEffect } from "react";

const bgImage: Record<string, string> = {
  [ERoutesName.SESSION_SIGNIN]: "signinRoute",
  [ERoutesName.SESSION_SIGNUP]: "signupRoute",
};

const getWavesClass = (pathname: string) => {
  const cssClassName = bgImage[pathname];
  return cssClassName ? styles[cssClassName] : "";
};

export const AuthLayout = () => {
  const [_, dismissLoading] = useIonLoading();
  const { isLoadingFull } = useApp();

  useEffect(() => {
    return () => {
      const onDismiss = async () => await dismissLoading();
      onDismiss();
    };
  }, []);

  return (
    <IonContent
      className={`${styles.layoutContent} ${getWavesClass(location.pathname)}`}
    >
      <div
        className={`${styles.layoutContainer} ${getWavesClass(
          location.pathname
        )}`}
      >
        <IonCol className={styles.logoContainer}>
          <img src="/assets/images/logo-full.png" className={styles.logoImg} />
        </IonCol>
        <TabBar />

        <main>
          <Outlet />
        </main>
        <SpinnerFullScreen
          show={isLoadingFull}
          borderRadius
          className={styles.authLoading}
        />
      </div>
    </IonContent>
  );
};
