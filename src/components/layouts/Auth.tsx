import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import { Outlet, useLocation } from "react-router-dom";

import styles from "./Auth.module.css";

import { TabBar } from "@/components/modules/auth/TabBar";
import { TransitionUpDown } from "@/components/modules/navigation/TransitionUpDown";

const bgImage: Record<string, string> = {
  "/app/sesion/entrar": "signinRoute",
  "/app/sesion/registrar": "signupRoute",
};

const getWavesClass = (pathname: string) => {
  const cssClassName = bgImage[pathname];
  return cssClassName ? styles[cssClassName] : "";
};

const AuthLayout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <IonContent
      className={`${styles.layoutContainer} ${getWavesClass(pathname)}`}
    >
      <IonGrid className={`${styles.layoutGrid} ${getWavesClass(pathname)}`}>
        <IonRow>
          <IonCol className={styles.logoContainer}>
            <img
              src="/assets/images/logo-full.png"
              className={styles.logoImg}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <TabBar />
        </IonRow>

        <TransitionUpDown>
          <Outlet />
        </TransitionUpDown>
      </IonGrid>
    </IonContent>
  );
};

export default AuthLayout;
