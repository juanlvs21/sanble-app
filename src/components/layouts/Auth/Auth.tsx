import { IonCol, IonContent } from "@ionic/react";
import { Outlet } from "react-router-dom";

import styles from "./Auth.module.css";

import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { TabBar } from "@/components/modules/auth/TabBar";
import { useApp } from "@/hooks/useApp";

const bgImage: Record<string, string> = {
  "/app/sesion/entrar": "signinRoute",
  "/app/sesion/registrarse": "signupRoute",
};

const getWavesClass = (pathname: string) => {
  const cssClassName = bgImage[pathname];
  return cssClassName ? styles[cssClassName] : "";
};

type ComponentProps = {
  /**
   * CSS transition className
   */
  transitionStage: string;
  /**
   * Function to set transitionStage
   */
  onAnimationEnd: () => void;
};

export const AuthLayout: React.FC<ComponentProps> = ({
  onAnimationEnd,
  transitionStage,
}) => {
  const { isLoadingFull } = useApp();

  return (
    <IonContent
      className={`${styles.layoutContent} ${getWavesClass(location.pathname)}`}
    >
      <div
        className={`${styles.layoutContainer} ${getWavesClass(
          location.pathname
        )}`}
      >
        <div>
          <IonCol className={styles.logoContainer}>
            <img
              src="/assets/images/logo-full.png"
              className={styles.logoImg}
            />
          </IonCol>
        </div>
        <div>
          <TabBar />
        </div>

        <main className={transitionStage} onAnimationEnd={onAnimationEnd}>
          <Outlet />
        </main>
        <SpinnerFullScreen show={isLoadingFull} borderRadius />
      </div>
    </IonContent>
  );
};
