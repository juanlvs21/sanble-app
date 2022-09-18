import { IonContent, IonCol } from "@ionic/react";
import { Outlet } from "react-router-dom";

import styles from "./Auth.module.css";

import { TabBar } from "@/components/modules/auth/TabBar";

const bgImage: Record<string, string> = {
  "/app/sesion/entrar": "signinRoute",
  "/app/sesion/registrar": "signupRoute",
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

const AuthLayout: React.FC<ComponentProps> = ({
  onAnimationEnd,
  transitionStage,
}) => (
  <IonContent
    className={`${styles.layoutContainer} ${getWavesClass(location.pathname)}`}
  >
    <div className={`${styles.layoutWave} ${getWavesClass(location.pathname)}`}>
      <div>
        <IonCol className={styles.logoContainer}>
          <img src="/assets/images/logo-full.png" className={styles.logoImg} />
        </IonCol>
      </div>
      <div>
        <TabBar />
      </div>

      <main className={transitionStage} onAnimationEnd={onAnimationEnd}>
        <Outlet />
      </main>
    </div>
  </IonContent>
);

export default AuthLayout;
