import { IonCol, IonContent, useIonLoading } from "@ionic/react";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import styles from "./Auth.module.css";

import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { TabBar } from "@/components/modules/auth/TabBar";
import { useApp } from "@/hooks/useApp";
import { ERoutesName } from "@/types/TRoutes";
import { useEffect } from "react";

const bgImage: Record<string, string> = {
  [ERoutesName.SESSION_SIGNIN]: "signinRoute",
  [ERoutesName.SESSION_SIGNUP]: "signupRoute",
  [ERoutesName.SESSION_RECOVERY_PASSWORD]: "signinRoute",
  [ERoutesName.SESSION_RECOVERY_PASSWORD_SUCCESS]: "signinRoute",
};

const getWavesClass = (pathname: string) => {
  const cssClassName = bgImage[pathname];
  return cssClassName ? styles[cssClassName] : "";
};

export const AuthLayout = () => {
  const [_, dismissLoading] = useIonLoading();
  const { isLoadingFull } = useApp();

  const matchRecoveryPassword = useMatch(ERoutesName.SESSION_RECOVERY_PASSWORD);
  const matchRecoveryPasswordSuccess = useMatch(
    ERoutesName.SESSION_RECOVERY_PASSWORD_SUCCESS
  );

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
        )} ${
          matchRecoveryPassword || matchRecoveryPasswordSuccess
            ? styles.layoutContainerRecovery
            : ""
        }`}
      >
        <IonCol className={styles.logoContainer}>
          <img src="/assets/images/logo-full.png" className={styles.logoImg} />
        </IonCol>

        {!(matchRecoveryPassword || matchRecoveryPasswordSuccess) && <TabBar />}

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
