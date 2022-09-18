import { useEffect, useState } from "react";
import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import { Outlet, useLocation } from "react-router-dom";

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
  onAnimationEnd: () => void;
  transitionStage: string;
};

const AuthLayout: React.FC<ComponentProps> = ({
  onAnimationEnd,
  transitionStage,
}) => (
  <IonContent
    className={`${styles.layoutContainer} ${getWavesClass(location.pathname)}`}
  >
    <IonGrid
      className={`${styles.layoutGrid} ${getWavesClass(location.pathname)}`}
    >
      <IonRow>
        <IonCol className={styles.logoContainer}>
          <img src="/assets/images/logo-full.png" className={styles.logoImg} />
        </IonCol>
      </IonRow>
      <IonRow>
        <TabBar />
      </IonRow>

      <div className={transitionStage} onAnimationEnd={onAnimationEnd}>
        <Outlet />
      </div>
    </IonGrid>
  </IonContent>
);

export default AuthLayout;
